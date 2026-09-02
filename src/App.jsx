import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home/Home';
import Boutique from './pages/Boutique/Boutique';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Contact from './pages/Contact/Contact';
import Vinaigrerie from './pages/Vinaigrerie/Vinaigrerie';
import Recettes from './pages/Recettes/Recettes';
import NotreHistoire from './pages/NotreHistoire/NotreHistoire';
import CuveeLeonXIV from './pages/CuveeLeonXIV/CuveeLeonXIV';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProtectedAdminRoute from './pages/Admin/ProtectedAdminRoute';

function App() {
  return (
    <Router>
      <div className="app">

        <Navbar />

        <main className="content">
          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/boutique"
              element={<Boutique />}
            />

            <Route
              path="/produit/:id"
              element={<ProductDetail />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/vinaigrerie"
              element={<Vinaigrerie />}
            />

            <Route
              path="/recettes"
              element={<Recettes />}
            />

            <Route
              path="/notre-histoire"
              element={<NotreHistoire />}
            />

            <Route
              path="/cuvee-leon-xiv"
              element={<CuveeLeonXIV />}
            />

            {/* ADMIN LOGIN */}
            <Route
              path="/admin/login"
              element={<AdminLogin />}
            />

            {/* ADMIN DASHBOARD */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;