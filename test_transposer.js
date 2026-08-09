const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

const ids = {};
function el(id) {
  if (!ids[id]) ids[id] = { value: '', style: {}, innerHTML: '', addEventListener() {} };
  return ids[id];
}
global.document = { getElementById: el };

(0, eval)(script.replace(/^\s*'use strict';\s*/, ''));

function set(id, value) { el(id).value = value; }
function run(atual, desejado, tamanho, texto) {
  set('tom_atual', atual);
  set('tom_desejado', desejado);
  set('tamanho_acidente', String(tamanho));
  set('cifra_original', texto);
  transposar();
  return el('cifra_final').value;
}

function show(label, got, expected) {
  const ok = got === expected;
  console.log((ok ? 'PASS' : 'FAIL') + ' ' + label);
  if (!ok) {
    console.log('  esperado: ' + JSON.stringify(expected));
    console.log('  obtido:   ' + JSON.stringify(got));
  }
}

// 1. exemplo padrão C -> G
show('exemplo padrão',
  run('C', 'G', 1, 'C  G  Am  Em  F  C\nC7  B7  Bb  G7'),
  'G  D  Em  Bm  C  G\nG7  F#7 F   D7');

// 2. adição par (Bb->F em C->G, tamanho 2): 1 antes e 1 depois
show('adição par (tamanho 2)',
  run('C', 'G', 2, 'A  Bb  C'),
  'E   F   G');

// 3. adição ímpar (tamanho 3): 1 antes e 2 depois
show('adição ímpar (tamanho 3)',
  run('C', 'G', 3, 'A  Bb  C'),
  'E   F    G');

// 4. remoção par (B->F# em C->G, tamanho 2): 1 antes e 1 depois
show('remoção par (tamanho 2)',
  run('C', 'G', 2, 'A  B  C'),
  'E F# G');

// 5. remoção ímpar (tamanho 1): 0 antes, 1 depois
show('remoção ímpar (tamanho 1)',
  run('C', 'G', 1, 'A  B  C'),
  'E  F# G');

// 6. remoção no começo da linha: tudo à direita
show('remoção no começo da linha',
  run('C', 'G', 2, 'B  C'),
  'F#G');

// 7. remoção no fim da linha: tudo à esquerda
show('remoção no fim da linha',
  run('C', 'G', 2, 'A  B'),
  'EF#');

// 8. sem mudança de acidente: espaçamento intacto
show('sem mudança de acidente',
  run('C', 'G', 1, 'C  G  Am'),
  'G  D  Em');

// 9. enarmonia: C -> Db (bemóis)
show('enarmonia C -> Db',
  run('C', 'Db', 1, 'C  G  Am  F'),
  'Db Ab BbmGb');

// 10. enarmonia: C -> F# (sustenidos)
show('enarmonia C -> F#',
  run('C', 'F#', 1, 'C  G  D  A  E  B'),
  'F# C# G# D# A# F');

// 11. sufixos preservados
show('sufixos preservados',
  run('C', 'G', 1, 'Cm7  D7  G°  Bdim  A+  Fmaj7'),
  'Gm7  A7  D°  F#dim A+  Fmaj7');

// 12. acorde entre parênteses e baixo após barra (também é transposto)
show('parênteses e barra',
  run('C', 'G', 1, '(C)  C/G  F7'),
  '(G)  G/D  C7');

// 13. tamanho_acidente 0: nenhuma compensação
show('tamanho 0',
  run('C', 'G', 0, 'A  B  C'),
  'E  F#  G');

// 14. adição no fim da linha (sem regra especial de linha)
show('adição no fim da linha',
  run('C', 'G', 1, 'A  Bb'),
  'E  F ');

// 15. adição no começo da linha (sem regra especial de linha)
show('adição no começo da linha',
  run('C', 'G', 1, 'Bb  C'),
  'F   G');

// 16. acorde único na linha (começo e fim ao mesmo tempo)
show('acorde único na linha',
  run('C', 'G', 2, 'B'),
  'F#');

// 17. tom F (grafia com bemóis)
show('tom F com bemóis',
  run('C', 'F', 1, 'C  D  Eb'),
  'F  G  Ab');

// 18. F -> C (intervalo inverso)
show('F -> C',
  run('F', 'C', 1, 'F  Bb  C  Eb'),
  'C  F   G  A#');

// 19. tom com sustenido, nota enarmônica do baixo (C/G -> G/D)
show('C/G -> G/D',
  run('C', 'G', 1, 'C/G  Am7'),
  'G/D  Em7');
