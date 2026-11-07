# Instructions projet — the-gospel

Les conventions communes (dont le commit systématique) sont définies dans
`../AGENTS.md`, à la racine de `~/projets`.

## Projet

Page unique (`index.html`, `script.js`, `style.css`) qui présente des versets.

- On n'écrit dans le HTML que la référence (texte du `<a role="tab">`) et le
  contenu du panneau : le script génère id, href et attributs ARIA.
- Chaque `<li>` est un point ; un `<li>` = un `<span role="tablist">` suivi
  d'autant de `<div role="tabpanel">` qu'il y a d'onglets, dans le même ordre.
- Un seul `default` par `<li>` ; sans `default`, aucun onglet n'est ouvert.
- Les commentaires de fond vont dans un `<details><summary>` à l'intérieur du
  panneau (replié par défaut).
- Les renvois internes du type « cf. le point N » doivent être mis à jour à
  chaque insertion ou suppression de point.
