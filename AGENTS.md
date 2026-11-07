# Instructions pour les agents

## Commits

- **Commiter systématiquement** après chaque ensemble de modifications cohérent,
  sans attendre que l'utilisateur le demande.
- Un commit par changement logique : ne pas mélanger des sujets sans rapport.
- Message en français, à l'impératif, avec un corps qui liste les points modifiés.
- Ne commiter que les fichiers concernés par la tâche : ne jamais inclure un
  travail en cours qui ne vient pas de l'agent.
- Ne pas utiliser `git commit --amend` ni réécrire l'historique, sauf demande
  explicite.
- Si le dépôt contient des modifications non liées, ou si un fichier semble être
  du travail utilisateur, demander avant de commiter.
- Vérifier le résultat (structure HTML, rendu, tests disponibles) avant de
  commiter.

## Projet

Page unique (`index.html`, `script.js`, `style.css`) qui présente des versets.

- On n'écrit dans le HTML que la référence (texte du `<a role="tab">`) et le
  contenu du panneau : le script génère id, href et attributs ARIA.
- Chaque `<li>` est un point ; un `<li>` = un `<span role="tablist">` suivi
  d'autant de `<div role="tabpanel">` qu'il y a d'onglets, dans le même ordre.
- Un seul `default` par `<li>` ; sans `default`, aucun onglet n'est ouvert.
- Les commentaires de fond vont dans un `<details><summary>` à l'intérieur du
  panneau (replié par défaut).
