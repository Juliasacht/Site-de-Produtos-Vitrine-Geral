import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <Link to="/" className={styles.logo}>vitrine<span>.</span></Link>
            <p>Seu espaço para explorar, descobrir e guardar o que você gosta.</p>
          </div>
          <nav className={styles.footerNav} aria-label="Links do rodapé">
            <Link to="/">Início</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/favoritos">Favoritos</Link>
          </nav>
        </div>
        <div className={styles.bottom}>
          <span className={styles.credit}>
            © {new Date().getFullYear()} Vitrine Geral · Desenvolvido por{' '}
            <a href="https://www.linkedin.com/in/juliasacht/" target="_blank" rel="noopener noreferrer">
              Julia Sacht
            </a>
          </span>
          <nav className={styles.socialLinks} aria-label="Perfis profissionais da desenvolvedora">
            <a href="https://github.com/Juliasacht" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/juliasacht/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
