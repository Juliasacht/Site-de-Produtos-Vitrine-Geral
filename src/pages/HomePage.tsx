import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const categorias = [
  { nome: 'Moda e estilo', descricao: 'Peças para diferentes momentos.', simbolo: '✦', classe: 'moda' },
  { nome: 'Tecnologia', descricao: 'Acessórios e novidades para explorar.', simbolo: '⌘', classe: 'tecnologia' },
  { nome: 'Casa e decoração', descricao: 'Ideias para renovar seus espaços.', simbolo: '⌂', classe: 'casa' },
  { nome: 'Beleza', descricao: 'Produtos para o seu autocuidado.', simbolo: '✿', classe: 'beleza' },
];

export default function HomePage() {
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.hero} aria-labelledby="titulo-home">
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}><span aria-hidden="true">✦</span> Seu espaço de descobertas</span>
          <h1 id="titulo-home">Tudo o que você gosta, <span>em um só lugar.</span></h1>
          <p className={styles.description}>
            Explore produtos de diferentes categorias, encontre novas ideias e salve seus favoritos.
            Uma vitrine feita para descobrir no seu ritmo.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryButton} to="/produtos">
              Explorar produtos <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.secondaryButton} to="/favoritos">
              Ver meus favoritos
            </Link>
          </div>
          <div className={styles.heroNote}>
            <span className={styles.noteIcon} aria-hidden="true">♡</span>
            Descubra, escolha e guarde seus preferidos.
          </div>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.visualGlow} />
          <div className={styles.visualFrame}>
            <div className={styles.visualTop}>
              <span className={styles.visualDots}><i /><i /><i /></span>
              <span>Vitrine Geral</span>
              <span>✧</span>
            </div>
            <div className={styles.visualHeadline}>Encontre sua próxima descoberta.</div>
            <div className={styles.visualGrid}>
              <div className={styles.visualProduct + ' ' + styles.visualProductLilac}><span>✿</span><small>Beleza</small></div>
              <div className={styles.visualProduct + ' ' + styles.visualProductPeach}><span>⌘</span><small>Tech</small></div>
              <div className={styles.visualProduct + ' ' + styles.visualProductCream}><span>⌂</span><small>Casa</small></div>
            </div>
            <div className={styles.visualBottom}><span>Uma coleção de possibilidades</span><span>↗</span></div>
          </div>
          <span className={styles.floatingStar}>✦</span>
        </div>
      </section>

      <section className={styles.categoriesSection} aria-labelledby="titulo-categorias">
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionLabel}>EXPLORE A VITRINE</span>
            <h2 id="titulo-categorias">Descubra por categoria</h2>
            <p>De itens para o dia a dia a novas inspirações.</p>
          </div>
          <Link to="/produtos" className={styles.allProducts}>Ver todos os produtos <span aria-hidden="true">→</span></Link>
        </div>
        <div className={styles.categoryGrid}>
          {categorias.map(({ nome, descricao, simbolo, classe }) => (
            <Link key={nome} to="/produtos" className={styles.categoryCard + ' ' + styles[classe]}>
              <span className={styles.categoryIcon} aria-hidden="true">{simbolo}</span>
              <strong>{nome}</strong>
              <span>{descricao}</span>
              <span className={styles.categoryArrow} aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.favoritesBanner} aria-labelledby="titulo-favoritos">
        <div>
          <span className={styles.sectionLabel}>SEUS ESCOLHIDOS</span>
          <h2 id="titulo-favoritos">Gostou? Salve para depois.</h2>
          <p>Marque os produtos que chamarem sua atenção e consulte sua lista de favoritos quando quiser.</p>
        </div>
        <Link className={styles.bannerButton} to="/favoritos">Acessar favoritos <span aria-hidden="true">→</span></Link>
      </section>
    </div>
  );
}
