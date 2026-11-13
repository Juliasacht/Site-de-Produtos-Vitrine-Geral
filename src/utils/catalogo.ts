export type Ordenacao = 'relevancia' | 'nome-asc' | 'preco-asc' | 'preco-desc';

export interface ItemCatalogo {
  nome: string;
  marca: string;
  categoria: string;
  preco: number;
}

export function normalizarTexto(valor: string): string {
  return valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

export function obterCategorias<T extends ItemCatalogo>(produtos: T[]): string[] {
  return Array.from(new Set(produtos.map((produto) => produto.categoria.trim()).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
}

export function rotuloCategoria(categoria: string): string {
  const nomes: Record<string, string> = {
    beauty: 'Beleza',
    electronics: 'Eletrônicos',
    jewelery: 'Joias',
    "men's clothing": 'Moda masculina',
    "women's clothing": 'Moda feminina',
    fragrances: 'Perfumes',
    furniture: 'Móveis',
    groceries: 'Mercado',
    'home-decoration': 'Decoração',
    'kitchen-accessories': 'Cozinha',
    laptops: 'Notebooks',
    smartphones: 'Smartphones',
    'skin-care': 'Cuidados com a pele',
    'mobile-accessories': 'Acessórios para celular',
    'sports-accessories': 'Artigos esportivos',
    tops: 'Blusas',
    watches: 'Relógios',
  };

  const valor = categoria.replace(/-/g, ' ');
  return nomes[categoria.toLocaleLowerCase('en-US')] ?? valor.charAt(0).toLocaleUpperCase('pt-BR') + valor.slice(1);
}

export function filtrarEOrdenar<T extends ItemCatalogo>(
  produtos: T[],
  busca: string,
  categoria: string,
  ordenacao: Ordenacao,
): T[] {
  const termo = normalizarTexto(busca);
  const filtrados = produtos.filter((produto) => {
    const correspondeBusca = !termo || [produto.nome, produto.marca, produto.categoria]
      .some((campo) => normalizarTexto(campo).includes(termo));
    return correspondeBusca && (categoria === 'todos' || produto.categoria === categoria);
  });

  if (ordenacao === 'nome-asc') {
    return filtrados.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));
  }

  if (ordenacao === 'preco-asc') return filtrados.sort((a, b) => a.preco - b.preco);
  if (ordenacao === 'preco-desc') return filtrados.sort((a, b) => b.preco - a.preco);

  return filtrados;
}

/** As APIs de demonstração informam valores em dólares americanos. */
export function formatarPrecoUSD(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(valor);
}
