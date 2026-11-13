import { useEffect, useState } from 'react';
import styles from './CardProduto.module.css';
import { Produto } from '../models/Produto';
import { formatarPrecoUSD } from '../utils/catalogo';

interface Props {
  produto: Produto;
  onFavoritar?: (produto: Produto) => void;
  aoRemover?: () => void;
  mostrarRemover?: boolean;
}

export default function CardProduto({ produto, onFavoritar, aoRemover, mostrarRemover = false }: Props) {
  const [favoritado, setFavoritado] = useState(false);
  const [imagemIndisponivel, setImagemIndisponivel] = useState(false);

  const lerFavoritos = (): Produto[] => {
    try {
      const salvos = JSON.parse(localStorage.getItem('favoritos') || '[]');
      return Array.isArray(salvos) ? salvos : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const favoritos = lerFavoritos();
    setFavoritado(favoritos.some((p: Produto) => p.id === produto.id));
  }, [produto.id]);

  const alternarFavorito = () => {
    const favoritos = lerFavoritos();
    const novosFavoritos = favoritado
      ? favoritos.filter((p: Produto) => p.id !== produto.id)
      : [...favoritos, produto];

    localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
    setFavoritado(!favoritado);
    if (onFavoritar) onFavoritar(produto);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {produto.imagem && !imagemIndisponivel ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            loading="lazy"
            decoding="async"
            onError={() => setImagemIndisponivel(true)}
          />
        ) : (
          <span className={styles.imageFallback}>Imagem indisponível</span>
        )}
        <button
          type="button"
          className={styles.favoriteButton + (favoritado ? ' ' + styles.selected : '')}
          onClick={mostrarRemover ? aoRemover : alternarFavorito}
          aria-label={mostrarRemover ? 'Remover ' + produto.nome + ' dos favoritos' : (favoritado ? 'Remover ' : 'Adicionar ') + produto.nome + (favoritado ? ' dos favoritos' : ' aos favoritos')}
          title={mostrarRemover || favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <span aria-hidden="true">{mostrarRemover || favoritado ? '♥' : '♡'}</span>
        </button>
      </div>
      <div className={styles.details}>
        <span className={styles.brand}>{produto.marca}</span>
        <h3 title={produto.nome}>{produto.nome}</h3>
        <div className={styles.bottomRow}>
          <strong className={styles.price}>{formatarPrecoUSD(produto.preco)}</strong>
          <span className={styles.category}>{produto.categoria}</span>
        </div>
      </div>
    </article>
  );
}
