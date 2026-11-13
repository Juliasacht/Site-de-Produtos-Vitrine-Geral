import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardProduto from '../components/CardProduto';
import controller from '../controllers/controllerSingleton';
import { Produto } from '../models/Produto';
import styles from './FavoritosPage.module.css';

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  useEffect(() => {
    const salvos = localStorage.getItem('favoritos');
    if (salvos) {
      const parsed = JSON.parse(salvos);
      const instancias = parsed.map((p: any) => new Produto(
        p.id, p.nome, p.marca, p.preco, p.descricao, p.categoria, p.imagem
      ));
      setFavoritos(instancias);
    } else {
      setFavoritos(controller.listarFavoritos());
    }
  }, []);

  const remover = (produto: Produto) => {
    const atualizados = favoritos.filter((p) => p.id !== produto.id);
    setFavoritos(atualizados);
    localStorage.setItem('favoritos', JSON.stringify(atualizados));
    controller.removerFavorito(produto.id);
  };

  return (
    <div className={styles.favoritosWrapper}>
      <div className={styles.favoritosContainer}>
        <div className={styles.heading}>
          <span className={styles.eyebrow}>SUA LISTA ESPECIAL</span>
          <h1>Meus <em>favoritos.</em></h1>
          <p>Os produtos que você marcou para consultar sempre que quiser.</p>
        </div>
        {favoritos.length === 0 ? (
          <div className={styles.emptyState}>
            <span aria-hidden="true">♡</span>
            <h2>Sua lista ainda está vazia.</h2>
            <p>Explore o catálogo e salve os produtos que chamarem sua atenção.</p>
            <Link to="/produtos">Explorar produtos <span aria-hidden="true">↗</span></Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {favoritos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} aoRemover={() => remover(produto)} mostrarRemover />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
