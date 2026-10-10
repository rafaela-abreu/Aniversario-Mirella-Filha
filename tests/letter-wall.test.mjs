import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const code = await readFile(new URL('../assets/letter-wall.js', import.meta.url), 'utf8');
const { orderLetters, getLetterPage, LETTERS_PER_PAGE } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);

assert.equal(LETTERS_PER_PAGE, 3);
for (const size of [0, 1, 2, 3, 4, 6, 7, 20]) {
  const letters = Array.from({ length: size }, (_, i) => ({ id: i + 1, name: `Convidado ${i + 1}`, message: `Carinho número ${i + 1}`, createdAt: '2026-10-10' }));
  const original = JSON.stringify(letters);
  const sorted = orderLetters(letters);
  assert.equal(JSON.stringify(letters), original, 'Não modifica os dados recebidos');
  assert.equal(new Set(sorted.map(letter => letter.id)).size, size);
  const seen = [];
  const first = getLetterPage(sorted, 0);
  for (let page = 0; page < first.pageCount; page++) {
    const current = getLetterPage(sorted, page);
    assert.ok(current.letters.length <= 3);
    seen.push(...current.letters.map(letter => letter.id));
  }
  assert.deepEqual(seen, sorted.map(letter => letter.id));
  assert.equal(getLetterPage(sorted, 999).currentPage, first.pageCount - 1);
  assert.equal(getLetterPage(sorted, -1).currentPage, 0);
}
const ranked = orderLetters([
  { id: 1, message: 'Uma lembrança longa '.repeat(27) },
  { id: 2, message: 'Parabéns, Mirella! Muito amor, saúde e alegria!' },
  { id: 3, message: 'Feliz aniversário, linda!' },
  { id: 4, message: '<script>não executar</script>' },
]);
assert.ok(ranked.findIndex(letter => letter.id === 2) < ranked.findIndex(letter => letter.id === 1));
assert.ok(ranked.findIndex(letter => letter.id === 3) < ranked.findIndex(letter => letter.id === 1));
assert.equal(ranked.find(letter => letter.id === 4).message, '<script>não executar</script>');
console.log('OK: tamanhos 0, 1, 2, 3, 4, 6, 7 e 20; páginas de até três; todas as mensagens preservadas; seleção determinística; limites de página.');
