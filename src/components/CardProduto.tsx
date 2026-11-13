import { useEffect, useState } from 'react';
import styles from './CardProduto.module.css';
import { Produto } from '../models/Produto';

interface Props {
  produto: Produto;
  onFavoritar?: (produto: Produto) => void;
  aoRemover?: () => void;
  mostrarRemover?: boolean;
}

export default function CardProduto({ produto, onFavoritar, aoRemover, mostrarRemover = false }: Props) {
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    setFavoritado(favoritos.some((p: Produto) => p.id === produto.id));
  }, [produto.id]);

  const alternarFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
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
        <img src={produto.imagem} alt={produto.nome} loading="lazy" decoding="async" />
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
          <strong className={styles.price}>R$ {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          <span className={styles.category}>{produto.categoria}</span>
        </div>
      </div>
    </article>
  );
}
