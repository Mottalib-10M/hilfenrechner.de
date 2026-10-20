# Seiten des Hilfenrechners (de-sozialleistungen) schreiben und erweitern

Notice pour les agents qui prolongent le site (Grundsicherungsgeld ex-Bürgergeld, Wohngeld, Kinderzuschlag,
Kindergeld, Elterngeld, Unterhaltsvorschuss, Mutterschaftsgeld ; allemand seul). À lire avec
`~/Documents/GitHub/RECETTE-SITE.md`. Rapport SERP et levée de la réserve :
`~/Documents/GitHub/reports/de-sozialleistungen-serp-2026-10-20.md`.

## L'angle (ne pas le perdre)

Un foyer saisi une fois → toutes les aides calculées côte à côte, puis la combinaison qui s'applique selon la loi
(§ 12a SGB II, § 6a Abs. 1a BKGG) et le guichet de chaque demande (`engine/vergleich.ts`). Aucun site du top 10
ne répond par un chiffre à « Wohngeld + Kinderzuschlag ou Grundsicherungsgeld ? ». YMYL : l'administration
décide ; jamais de conseil juridique, jamais de formulaire.

## Droit en vigueur au 2026-10-20

SGB II dans la version de la loi du 16.4.2026 (BGBl. 2026 I Nr. 107), en vigueur au 1.7.2026 ; ancien droit pour
les Bewilligungszeiträume commencés avant (`P.vermoegen.bis2026`). Regelbedarfe 2026 (RBSFV 2026). Wohngeld :
valeurs du 1.1.2025. Tout projet (Regelbedarfe 2027, Kindergeld 267/272 €, réforme Wohngeld BT-Drs. 21/8284)
reste « à venir » / « Entwurf », jamais dans le calcul.

## Principe : une page = un fichier

`src/content/pages/<id>.ts` (`definePage`) : snippets (titre 50–60, description 150–160, terme-clé d'abord),
H1, `resume` (≥ 120 mots), FAQ (40 à 90 mots, jamais réutilisée), `body`, `sources` (clés de
`params-2026.json`), `tool`. Groupes : vergleich, grundsicherung, wohngeld, kinder, eltern. Longueur : guide
≥ 1 200 mots (resume + body, tableaux exclus), page outil ≥ 480. Outils : `{ kind: 'haushalt', props }`
(calculateur principal), `{ kind: 'elterngeld' }`, `{ kind: 'mini:<art>' }` (`lib/mini-specs.ts` : vermoegen,
regelsatz, mehrbedarf, hinzuverdienst, sanktion, karenz, wohngeld, kiz, kindergeld, elterngeld, uvg,
mutterschaft). Outil intégré dans le corps : `<!--tool:kind|{json}-->`. Copier la structure, jamais les phrases
(`check-unique` < 30 %). `helpers(true)` lève une erreur sur un lien vers une page inexistante.

Aides (`src/lib/helpers.ts`) : `h.P` (paramètres), `h.GSG`, `h.WG`, `h.KIZ`, `h.EG`, `h.UV`, `h.MU`, `h.VG`,
`h.NT` (moteurs), `h.a` (lien interne strict), `h.src` (source officielle), `h.m` / `h.m2` / `h.pc` / `h.date` /
`h.dec`, `h.table`, `h.box`. Aucun chiffre en dur : tout vient de `P` ou d'un moteur.

## Moteurs `src/lib/engine/` (tests : `tests/engine.test.ts`)

| Fichier | Contenu |
|---|---|
| `grundsicherung.ts` | Bedarf (Regelbedarfe, Mehrbedarf AE, KdU par tête), Einkommen (§ 11b), Sofortzuschlag § 72 |
| `wohngeld.ts` | Formule § 19 WoGG, Anlagen 1 à 3, Heizkosten- et Klimakomponente, 10 % par Abzug |
| `kiz.ts` | § 6a BKGG, Wohnanteil des parents (table du Merkblatt BA), exemples du Merkblatt testés (736 €, 106 €) |
| `uvg.ts`, `mutterschaft.ts`, `elterngeld.ts` | UVG = Mindestunterhalt − Kindergeld ; § 24i SGB V / § 20 MuSchG ; BEEG |
| `netto.ts`, `lohnsteuer.ts`, `sv.ts` | Net à partir du brut (PAP 2026 au centime : 63 + 28 cas BMF dans `tests/fixtures/`) |
| `vergleich.ts` | Le foyer : toutes les aides, Vorrangprüfung, Wahlrecht ≤ 100 €, guichets |

## Limites assumées (affichées sur /de/methodik/)

- KdU au réel (pas de plafond communal) ; Vermögen non vérifié ; Versicherungspauschale non déduite (texte
  post-réforme non vérifié) ; pas d'impôt d'église dans le net.
- Elterngeld calculé avec le PAP 2026, donc exact pour les naissances à partir de 2027.
- Wohngeld : Werbungskosten = Arbeitnehmer-Pauschbetrag 1 230 € (interprétation, dite comme telle).
- UVG : montants dérivés par nous (Mindestunterhalt − Kindergeld).

## Contournements de la trame (signalés)

- Le générateur exige la locale `en` : retirée ensuite (routes, ui, site-config) ; `_cfg` garde `en`.
- `LEGAL_REQUIRED` sans `legalForm` (vide comme les autres sites ; `check-legal` échouait sinon).
- Le générateur a ajouté `de-sozialleistungen.example de H` à `_trame/icones-drapeau.txt`.
- Aucun lien vers un autre site du portefeuille.
