# Kriittinen koodi 3

## Esimerkki 1: Pull request
Workflow: `.github/workflows/pr.yml`.

Ajetaan jokaista pull requestia vasten. Ajaa CodeQL-koodiskannauksen ja riippuvuudet skannaavaan dependency reviewin.

## Esimerkki 2: Agenttinen kehittäminen

Hakemistossa `agents/skills/` on neljä agenttiskilliä:

- **Spec Writer** (`spec-writer.md`) — Muuntaa feature-pyynnön tekniseksi spesifikaatioksi
- **Threat Modeller** (`threat-modeller.md`) — Tuottaa speksistä STRIDE-pohjaisen uhkamallin
- **Implementer** (`implementer.md`) — Toteuttaa koodin uhkamalli huomioiden
- **Security Reviewer** (`security-reviewer.md`) — Katselmoi toteutuksen ja ajaa riippuvuustarkistuksen

Agentin workflow on määritelty tiedostossa `.github/copilot-instructions.md`.

## Esimerkki 3: DAST
Hakemistossa `dast` on esimerkki Checkmarx ZAP-työkalun käytöstä Automation Frameworkin kanssa. Ajo skannaa lokaalisti pyörivää ohjelmistoa (tämän repon juuressa) ja tuottaa siitä raportit HTML- ja JSON-muodossa.

## Esimerkki 4: Attestaatio ja allekirjoitus
Workflow: `.github/workflows/release.yml`

Triggaa kun Git-tagi `v*` pushataan. Tekee kolme asiaa:

### 1. Build provenance -attestaatio (SLSA taso 2)
`actions/attest-build-provenance` luo allekirjoitetun todistuksen, joka sitoo image-digestin tähän workflow-ajoon ja commit-hashiin. Todistus tallennetaan OCI-rekisteriin kuvan rinnalle.

**Verifiointi GitHub CLI:llä:**
```bash
gh attestation verify \
  oci://ghcr.io/masse-solita/kriittinen-koodi-esimerkit:v1.0.0 \
  --repo masse-solita/kriittinen-koodi-esimerkit
```

### 2. Avaimeton allekirjoitus cosignilla (Sigstore)
`cosign sign --yes` allekirjoittaa image-digestin ilman pysyvää yksityistä avainta. GitHub Actions -workflown identiteetti todistetaan lyhytikäisellä OIDC-sertifikaatilla. Allekirjoituksen tiedot kirjautuvat julkiseen Rekor-läpinäkyvyyslokiin.

**Verifiointi cosignilla:**
```bash
cosign verify \
  --certificate-identity-regexp "https://github.com/masse-solita/kriittinen-koodi-esimerkit/" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  ghcr.io/masse-solita/kriittinen-koodi-esimerkit:v1.0.0
```

### 3. GitHub Release
Julkaisu luodaan automaattisesti tagin perusteella. Release-teksti sisältää valmiit verifiointikomennot.

### Demo-ajo
```bash
git tag v1.0.0
git push origin v1.0.0
```
