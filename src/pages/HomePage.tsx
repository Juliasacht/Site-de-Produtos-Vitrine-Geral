import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const colecoes = [
  {
    nome: 'Moda & estilo',
    descricao: 'Peças para expressar quem você é.',
    imagem: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=82',
    alt: 'Peças de roupa e acessórios em uma composição de moda',
  },
  {
    nome: 'Tecnologia',
    descricao: 'Ideias inteligentes para o dia a dia.',
    imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=82',
    alt: 'Fone de ouvido em destaque sobre fundo amarelo',
  },
  {
    nome: 'Casa & decoração',
    descricao: 'Detalhes que transformam ambientes.',
    imagem: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=82',
    alt: 'Cadeira de design contemporâneo em ambiente minimalista',
  },
];

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="titulo-home">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}><span aria-hidden="true" className={styles.dot} /> UMA VITRINE DE POSSIBILIDADES</span>
          <h1 id="titulo-home">Seu próximo favorito está <em>por aqui.</em></h1>
          <p>
            Produtos para cada estilo, ideia e momento. Explore diferentes categorias
            e guarde o que mais combina com você.
          </p>
          <div className={styles.actions}>
            <Link to="/produtos" className={styles.primaryCta}>Explorar produtos <span aria-hidden="true">↗</span></Link>
            <Link to="/favoritos" className={styles.textCta}>Meus favoritos <span aria-hidden="true">→</span></Link>
          </div>
          <div className={styles.heroFoot}>
            <span>DESCUBRA</span>
            <span className={styles.footDivider} />
            <span>EXPLORE</span>
            <span className={styles.footDivider} />
            <span>SALVE</span>
          </div>
        </div>
        <div className={styles.heroGallery}>
          <div className={styles.heroPhoto}>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85"
              alt="Relógio de pulso em uma fotografia de produto minimalista"
              fetchPriority="high"
            />
            <span className={styles.photoTag}>DESCOBERTAS DO DIA A DIA</span>
          </div>
          <div className={styles.photoCaption}>
            <span>Pequenos detalhes. Grandes escolhas.</span>
            <span aria-hidden="true">✳</span>
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-label="Categorias disponíveis no catálogo">
        <span>MODA</span><span aria-hidden="true">✳</span>
        <span>TECNOLOGIA</span><span aria-hidden="true">✳</span>
        <span>CASA</span><span aria-hidden="true">✳</span>
        <span>BELEZA</span><span aria-hidden="true">✳</span>
        <span>ACESSÓRIOS</span>
      </div>

      <section className={styles.collections} aria-labelledby="titulo-colecoes">
        <div className={styles.sectionTop}>
          <div>
            <span className={styles.sectionEyebrow}>ENCONTRE SUA INSPIRAÇÃO</span>
            <h2 id="titulo-colecoes">Um universo para <em>explorar.</em></h2>
          </div>
          <Link to="/produtos" className={styles.sectionLink}>Ver catálogo completo <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.collectionGrid}>
          {colecoes.map((colecao, indice) => (
            <article className={styles.collectionCard} key={colecao.nome}>
              <div className={styles.collectionPhoto}>
                <img src={colecao.imagem} alt={colecao.alt} loading="lazy" decoding="async" />
                <span className={styles.collectionNumber}>0{indice + 1}</span>
              </div>
              <div className={styles.collectionInfo}>
                <div>
                  <h3>{colecao.nome}</h3>
                  <p>{colecao.descricao}</p>
                </div>
                <span className={styles.collectionSymbol} aria-hidden="true">↗</span>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.caption}>Imagens ilustrativas. Confira os produtos disponíveis no catálogo.</p>
      </section>

      <section className={styles.favoriteFeature} aria-labelledby="titulo-favoritos">
        <div className={styles.featureDecoration} aria-hidden="true">♡</div>
        <div className={styles.featureText}>
          <span className={styles.sectionEyebrow}>UMA LISTA SÓ SUA</span>
          <h2 id="titulo-favoritos">Viu, gostou, <em>salvou.</em></h2>
          <p>Favorite os produtos que chamarem sua atenção e encontre tudo depois em um só lugar.</p>
          <Link to="/favoritos" className={styles.featureCta}>Ver meus favoritos <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.featureSteps} aria-label="Como funciona">
          <span><b>01</b> Explore o catálogo</span>
          <span><b>02</b> Encontre seus preferidos</span>
          <span><b>03</b> Salve para rever depois</span>
        </div>
      </section>
    </div>
  );
}
