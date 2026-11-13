import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

const navegacao = [
  { to: '/', label: 'Início', end: true },
  { to: '/produtos', label: 'Produtos', end: false },
  { to: '/favoritos', label: 'Favoritos', end: false },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.announcement}>
        <span>UMA VITRINE DE DESCOBERTAS</span>
        <span className={styles.announcementSeparator} aria-hidden="true">✳</span>
        <span>EXPLORE E SALVE SEUS FAVORITOS</span>
      </div>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand} aria-label="Vitrine Geral, voltar ao início">
          vitrine<span>.</span><small>GERAL</small>
        </NavLink>
        <nav className={styles.nav} aria-label="Navegação principal">
          {navegacao.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => [styles.navLink, isActive ? styles.active : ''].filter(Boolean).join(' ')}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <Link to="/produtos" className={styles.headerAction}>
          Explorar catálogo <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
