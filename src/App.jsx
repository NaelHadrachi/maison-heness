import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Boutique from './pages/Boutique';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Vinaigrerie from './pages/Vinaigrerie';
import Recettes from './pages/Recettes';
import NotreHistoire from './pages/NotreHistoire';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vinaigrerie" element={<Vinaigrerie />} />
            <Route path="/recettes" element={<Recettes />} />
            <Route path="/notre-histoire" element={<NotreHistoire />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
