# Kriittinen koodi
Webinaarisarjan esimerkkejä.

## Esimerkki 1: postinstall

Hakemistossa *postinstall/project* on npm-projekti, joka riippuu hakemistossa *not-a-real-dependency* olevasta npm-paketista. Jälkimmäisessä on postinstall-skripti, joka varastaa:
- Ympäristömuuttujan *FAKE_AUTH_TOKEN*
- Kotihakemistossa olevan tiedoston *~/.fake/key*

Aja hakemistossa *postinstall/project*:
```
export FAKE_AUTH_TOKEN="fake_token_$(uuid)"
echo "fake_key_$(uuid)" > ~/.fake/key
tmux new-session \; split-window -h \; send-keys -t 0:0.1 "python3 -m http.server 8080" Enter \; select-pane -t 0:0.0 \; attach
npm i
```
Seuraa oikeanpuoleisesta panesta tietojen varastamista.

### Suojautuminen
- Disabloi postinstall-skriptit
  - `npm i --ignore-scripts`
  - `npm ci --ignore-scripts`
- Käytä dev containeria

## Esimerkki 2: integrity

Hakemistossa *integrity* on seitsemän alihakemistoa, joissa jokaisessa on `package.json` eri versiomäärityksellä `express`-riippuvuudelle. Aja `npm install` kussakin hakemistossa ja tarkastele, mikä versio asentuu.

```bash
for dir in */; do
  (cd "$dir" && npm install --silent)
  echo "$dir: $(cat $dir/node_modules/express/package.json | grep '"version"' | head -1)"
done
```

| Hakemisto | Versiomääritys | Sallittu alue |
|---|---|---|
| `1-wildcard/` | `"*"` | Mikä tahansa versio — resolvautuu v5:een |
| `2-gte/` | `">=4.0.0"` | 4.0.0 tai uudempi — resolvautuu v5:een |
| `3-major-x/` | `"4.x"` | Mikä tahansa minor+patch major-version 4 sisällä |
| `4-caret/` | `"^4.18.0"` | Minor+patch päivitykset major-version 4 sisällä (npm-oletus) |
| `5-tilde/` | `"~4.18.0"` | Vain patch-päivitykset 4.18:n sisällä |
| `6-minor-x/` | `"4.18.x"` | Mikä tahansa patch 4.18:n sisällä |
| `7-exact/` | `"4.18.2"` | Täsmälleen tämä versio |

### Suojautuminen
- Käytä tarkkoja tai mahdollisimman rajattuja versiomäärityksiä (`"~4.18.2"` tai `"4.18.2"`)
- Tallenna ja versioi `package-lock.json` tai `yarn.lock`
- Käytä `npm ci` tuotanto- ja CI-asennuksissa (`npm install`-komennon sijaan)
- Hyödynnä `npm audit` tai vastaavaa työkalua

## Esimerkki 3: sbom

Hakemistossa *sbom* on npm-projekti, jolla on yksi suora riippuvuus: `express`. SBOM (Software Bill of Materials) paljastaa, kuinka paljon transitiivisia riippuvuuksia tämän yhden paketin taakse kätkeytyy.

Aja hakemistossa *sbom*:
```bash
npm install
npm sbom --sbom-format cyclonedx > bom.json
jq '.components | length' < bom.json
jq -r '.components[].name' < bom.json | sort
```
### Suojautuminen
- Generoi SBOM osana CI/CD-putkea: `npm sbom --sbom-format cyclonedx > bom.json`
- Käytä SBOM-analyysialustaa kuten Dependency-Track haavoittuvuuksien tunnistamiseen
