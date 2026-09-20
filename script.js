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
function select(tab) {
  if (!tab) return;
  tab.parentNode.querySelectorAll('[role="tab"]').forEach(function (t) {
    t.setAttribute('aria-selected', t === tab);
    var panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = t !== tab;
  });
}

// Un clic change le hash (les onglets sont des #panel-<ref>), ce qui appelle open().
function open() {
  select(document.querySelector('[role="tab"][aria-controls="' + location.hash.slice(1) + '"]'));
}

// Au chargement : 1er onglet de chaque <li>, puis l'ancre de l'URL si elle vise un verset.
document.querySelectorAll('[role="tablist"]').forEach(function (list) {
  select(list.querySelector('[role="tab"]'));
});
open();

addEventListener('hashchange', open);
