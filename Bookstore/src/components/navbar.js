import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';

const NavBar = () => {
    return (
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
        <img src={logo} alt="Logo" className={styles.logo} />
        </NavLink>
        
        <ul className={styles.links_list}>
          <li>
            <NavLink to="/">Home</NavLink>          
          </li>
          <li>
            <NavLink to="/login">Logar</NavLink>          
          </li>
          <li>
            <NavLink to="/register">Cadastrar-se</NavLink>          
          </li>
          <li>
            <NavLink to="/store">loja</NavLink>          
          </li>
          <li>
            <NavLink to="/contact">Contato</NavLink>          
          </li>
          <li>
            <NavLink to="/about">Sobre</NavLink>          
          </li>
        </ul>
      </nav>
    );
  };

  export default NavBar
  