import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Executa as funções reais do catálogo após transpilar o arquivo TypeScript.
const codigo = readFileSync(new URL('../src/utils/catalogo.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(codigo, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext },
});
const {
  normalizarTexto,
  obterCategorias,
  filtrarEOrdenar,
  rotuloCategoria,
  formatarPrecoUSD,
} = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));

const produtos = [
  { nome: 'Câmera digital', marca: 'Exemplo', categoria: 'electronics', preco: 250 },
  { nome: 'Sérum facial', marca: 'Beleza Co', categoria: 'beauty', preco: 18 },
  { nome: 'Fone Bluetooth', marca: 'Exemplo', categoria: 'electronics', preco: 65 },
];

test('normaliza acentos e letras maiúsculas na busca', () => {
  assert.equal(normalizarTexto('  CÂMERA  '), 'camera');
  assert.deepEqual(filtrarEOrdenar(produtos, 'camera', 'todos', 'relevancia').map(p => p.nome), ['Câmera digital']);
  assert.deepEqual(filtrarEOrdenar(produtos, 'beleza', 'todos', 'relevancia').map(p => p.nome), ['Sérum facial']);
});

test('filtra pela marca e categoria, incluindo combinações', () => {
  assert.equal(filtrarEOrdenar(produtos, 'Exemplo', 'electronics', 'relevancia').length, 2);
  assert.equal(filtrarEOrdenar(produtos, 'Sérum', 'electronics', 'relevancia').length, 0);
});

test('gera categorias dinâmicas sem duplicações', () => {
  assert.deepEqual(obterCategorias(produtos), ['beauty', 'electronics']);
  assert.equal(rotuloCategoria('electronics'), 'Eletrônicos');
  assert.equal(rotuloCategoria('home-decoration'), 'Decoração');
});

test('ordena por nome e preço sem alterar o array original', () => {
  assert.deepEqual(filtrarEOrdenar(produtos, '', 'todos', 'nome-asc').map(p => p.nome),
    ['Câmera digital', 'Fone Bluetooth', 'Sérum facial']);
  assert.deepEqual(filtrarEOrdenar(produtos, '', 'todos', 'preco-asc').map(p => p.preco), [18, 65, 250]);
  assert.deepEqual(filtrarEOrdenar(produtos, '', 'todos', 'preco-desc').map(p => p.preco), [250, 65, 18]);
  assert.deepEqual(produtos.map(p => p.preco), [250, 18, 65]);
});

test('exibe valores em dólares, sem tratá-los como reais', () => {
  assert.match(formatarPrecoUSD(29.5), /US\$\s*29,50/);
});
