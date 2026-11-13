import { useEffect, useMemo, useState } from 'react';
import CardProduto from '../components/CardProduto';
import { Produto } from '../models/Produto';
import { filtrarEOrdenar, obterCategorias, rotuloCategoria, type Ordenacao } from '../utils/catalogo';
import './ProdutosPage.css';

interface ProdutoFakeStore {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
}

interface ProdutoDummyJSON {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

async function solicitarProdutos(url: string, signal: AbortSignal): Promise<unknown> {
  const resposta = await fetch(url, { signal });
  if (!resposta.ok) throw new Error('Falha na API: ' + resposta.status);
  return resposta.json();
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('todos');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('relevancia');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    const carregar = async () => {
      setCarregando(true);
      setErro('');

      const resultados = await Promise.allSettled([
        solicitarProdutos('https://fakestoreapi.com/products', controlador.signal),
        solicitarProdutos('https://dummyjson.com/products?limit=100', controlador.signal),
      ]);
      if (controlador.signal.aborted) return;

      const produtosFake = resultados[0].status === 'fulfilled' && Array.isArray(resultados[0].value)
        ? resultados[0].value as ProdutoFakeStore[]
        : [];
      const respostaDummy = resultados[1].status === 'fulfilled'
        ? resultados[1].value as { products?: ProdutoDummyJSON[] }
        : {};
      const produtosDummy = Array.isArray(respostaDummy?.products) ? respostaDummy.products : [];

      const listaFake = produtosFake.map((item) => new Produto(
        Number(item.id),
        item.title || 'Produto sem nome',
        'FakeStore API',
        Number(item.price) || 0,
        item.description || '',
        item.category || 'Outros',
        item.image || '',
      ));

      const listaDummy = produtosDummy.map((item) => new Produto(
        Number(item.id) + 1000,
        item.title || 'Produto sem nome',
        'DummyJSON',
        Number(item.price) || 0,
        item.description || '',
        item.category || 'Outros',
        item.thumbnail || item.images?.[0] || '',
      ));

      const carregados = [...listaFake, ...listaDummy];
      setProdutos(carregados);

      if (carregados.length === 0) {
        setErro('Não foi possível carregar o catálogo. Verifique a conexão e tente novamente.');
      } else if (resultados.some((resultado) => resultado.status === 'rejected')) {
        setErro('Parte do catálogo está indisponível no momento. Os produtos disponíveis continuam visíveis.');
      }
      setCarregando(false);
    };

    void carregar();
    return () => controlador.abort();
  }, [tentativa]);

  const categorias = useMemo(() => obterCategorias(produtos), [produtos]);
  const produtosVisiveis = useMemo(
    () => filtrarEOrdenar(produtos, busca, categoria, ordenacao),
    [produtos, busca, categoria, ordenacao],
  );

  const limparFiltros = () => {
    setBusca('');
    setCategoria('todos');
    setOrdenacao('relevancia');
  };

  return (
    <div className="pagina-produtos">
      <h1 className="titulo-produtos">Explore o catálogo</h1>
      <p className="subtitulo-produtos">Descubra itens de diferentes categorias e salve seus favoritos.</p>

      <div className="busca-container" role="search" aria-label="Buscar e filtrar produtos">
        <div className="search-wrapper">
          <span className="lupa" aria-hidden="true">⌕</span>
          <label className="rotulo-filtro" htmlFor="busca-produtos">Buscar produtos</label>
          <input
            id="busca-produtos"
            className="search-bar"
            type="search"
            placeholder="Nome, marca ou categoria"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />
        </div>
        <div className="campo-filtro">
          <label className="rotulo-filtro" htmlFor="categoria-produtos">Categoria</label>
          <select id="categoria-produtos" className="filtro-categoria" value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
            <option value="todos">Todas as categorias</option>
            {categorias.map((valor) => <option key={valor} value={valor}>{rotuloCategoria(valor)}</option>)}
          </select>
        </div>
        <div className="campo-filtro">
          <label className="rotulo-filtro" htmlFor="ordenacao-produtos">Ordenar por</label>
          <select
            id="ordenacao-produtos"
            className="filtro-categoria"
            value={ordenacao}
            onChange={(evento) => setOrdenacao(evento.target.value as Ordenacao)}
          >
            <option value="relevancia">Ordem original</option>
            <option value="nome-asc">Nome (A–Z)</option>
            <option value="preco-asc">Menor preço</option>
            <option value="preco-desc">Maior preço</option>
          </select>
        </div>
      </div>

      <div className="resumo-resultados">
        <span aria-live="polite">
          {carregando ? 'Carregando produtos…' : `${produtosVisiveis.length} ${produtosVisiveis.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`}
        </span>
        {(busca || categoria !== 'todos' || ordenacao !== 'relevancia') && (
          <button type="button" className="limpar-filtros" onClick={limparFiltros}>Limpar filtros</button>
        )}
      </div>

      {erro && (
        <div className="aviso-catalogo" role={produtos.length ? 'status' : 'alert'}>
          <p>{erro}</p>
          <button type="button" onClick={() => setTentativa((atual) => atual + 1)}>Tentar novamente</button>
        </div>
      )}

      <div className="grid-produtos" aria-busy={carregando}>
        {carregando ? (
          <div className="estado-catalogo" role="status">Buscando novidades para você…</div>
        ) : produtosVisiveis.length === 0 && !erro ? (
          <div className="estado-catalogo">
            <h2>Nenhum resultado por aqui.</h2>
            <p>Tente outro termo ou remova os filtros para explorar mais produtos.</p>
            <button type="button" onClick={limparFiltros}>Ver todos os produtos</button>
          </div>
        ) : (
          produtosVisiveis.map((produto) => <CardProduto key={produto.id} produto={produto} />)
        )}
      </div>
    </div>
  );
}
