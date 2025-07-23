import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={{ backgroundColor: '#6a4e23', padding: '1em', color: 'white', textAlign: 'center' }}>
      <h1>Maison Heness</h1>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', gap: '1.5rem', padding: 0 }}>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/">Accueil</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/notre-histoire">Notre Histoire</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/vinaigrerie">Notre Vinaigrerie</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/boutique">Boutique</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/recettes">Recettes</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
