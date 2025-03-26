import styles from './NavBar.module.css';

const NavBar = () => {
    return (
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          BLOG<span>TRAVELS</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink to="/">Home</NavLink>         
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>         
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>         
          </li>
          <li>
            <NavLink to="/about">Sobre</NavLink>         
          </li>
        </ul>
      </nav>
    );
   };