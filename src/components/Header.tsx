import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/produtos', label: 'Produtos', end: false },
  { to: '/favoritos', label: 'Favoritos', end: false },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand} aria-label="Vitrine Geral — página inicial">
          <span className={styles.brandMark} aria-hidden="true">V</span>
          <span className={styles.brandText}>
            <strong>Vitrine Geral</strong>
            <small>Encontre o que combina com você</small>
          </span>
        </NavLink>

        <nav className={styles.nav} aria-label="Navegação principal">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.active : ''].filter(Boolean).join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
