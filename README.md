# Kriittinen koodi
Webinaarisarjan esimerkkejä.

## Esimerkki 1: postinstall

Hakemistossa *project* on npm-projekti, joka riippuu hakemistossa *not-a-real-dependency* olevasta npm-paketista. Jälkimmäisessä on postinstall-skripti, joka varastaa:
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

## Esimerkki 2: integrity
TODO

## Esimerkki 3: sbom
TODO
