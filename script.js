// Transforme une reference ("1 Jn 4:9-10") en identifiant ("1-jn-4-9-10").
function slug(text) {
  return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// 1) Construction : ajoute tous les attributs redondants a partir du texte de l'onglet.
var taken = {};
document.querySelectorAll('[role="tablist"]').forEach(function (list) {
  var tabs = list.querySelectorAll('[role="tab"]');
  var panels = list.parentNode.querySelectorAll('[role="tabpanel"]');
  tabs.forEach(function (tab, i) {
    var base = slug(tab.textContent) || 'onglet';
    var unique = base;
    for (var n = 2; taken[unique]; n++) unique = base + '-' + n; // id unique dans la page
    taken[unique] = true;

    tab.id = 'tab-' + unique;
    tab.href = '#panel-' + unique;
    tab.setAttribute('aria-controls', 'panel-' + unique);
    if (panels[i]) {
      panels[i].id = 'panel-' + unique;
      panels[i].setAttribute('aria-labelledby', 'tab-' + unique);
    }
  });
});

// 2) Selection : un seul onglet ouvert a la fois dans un <li>.
// tab = null ferme tous les onglets du groupe (aucun panneau affiche).
function select(list, tab) {
  list.querySelectorAll('[role="tab"]').forEach(function (t) {
    t.setAttribute('aria-selected', t === tab);
    var panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = t !== tab;
  });
}

// Un clic sur une reference ouvre le verset SANS suivre le lien :
// le defaut du navigateur ferait defiler la page jusqu'a l'ancre.
// L'URL est mise a jour a la main (replaceState) pour garder la reference partageable.
document.querySelectorAll('[role="tablist"]').forEach(function (list) {
  list.addEventListener('click', function (e) {
    var tab = e.target.closest ? e.target.closest('[role="tab"]') : null;
    if (!tab) return;
    e.preventDefault();
    select(list, tab);
    if (history.replaceState) history.replaceState(null, '', '#' + tab.getAttribute('aria-controls'));
  });
});

// Ouverture depuis l'URL (chargement direct ou hash change a la main).
function open() {
  var tab = document.querySelector('[role="tab"][aria-controls="' + location.hash.slice(1) + '"]');
  if (tab) select(tab.parentNode, tab);
}

// Au chargement : l'onglet portant l'attribut "default" de chaque <li>
// (aucun s'il n'y en a pas), puis l'ancre de l'URL si elle vise un verset.
document.querySelectorAll('[role="tablist"]').forEach(function (list) {
  select(list, list.querySelector('[role="tab"][default]'));
});
open();

addEventListener('hashchange', open);
