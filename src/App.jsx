import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home/Home';
import Boutique from './pages/Boutique/Boutique';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Contact from './pages/Contact/Contact';
import Vinaigrerie from './pages/Vinaigrerie/Vinaigrerie';
import Recettes from './pages/Recettes/Recettes';
import NotreHistoire from './pages/NotreHistoire/NotreHistoire';
import CuveeLeonXIV from './pages/CuveeLeonXIV/CuveeLeonXIV';
import Qvoleurs from './pages/4voleurs/Les4VoleursPage'
import CuveeBernadoucePage from './pages/CuveeBernadouce/CuveeBernadoucePage';
import AuthPage from './pages/Auth/AuthPage';
import CheckoutPage from './pages/Checkout/Checkout';
import { OrderSuccess } from './pages/OrderSuccess/OrderSuccess';
import DynamicPage from './pages/DynamicPage/DynamicPage';
import SettingsPage from './pages/Settings/SettingsPage';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUserDetail from './pages/Admin/AdminUserDetail';
import AdminShipmentDetail from './pages/Admin/AdminShipmentDetail';
import AdminOrderDetail from './pages/Admin/AdminOrderDetail';
import ProtectedAdminRoute from './pages/Admin/ProtectedAdminRoute';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="flex min-h-screen w-full flex-col bg-[#f6f0e6] text-[#1f1a16]">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/produit/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/vinaigrerie" element={<Vinaigrerie />} />
              <Route path="/recettes" element={<Recettes />} />
              <Route path="/notre-histoire" element={<NotreHistoire />} />
              <Route path="/cuvee-leon-xiv" element={<CuveeLeonXIV />} />
              <Route path="/4voleurs" element={<Qvoleurs />} />
              <Route path="/cuvee-bernadouce" element={<CuveeBernadoucePage />} />
              <Route path="/connexion" element={<AuthPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/commande/succes" element={<OrderSuccess />} />
              <Route path="/page/:slug" element={<DynamicPage />} />

              <Route path="/settings" element={<SettingsPage />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/utilisateurs/:id"
                element={
                  <ProtectedAdminRoute>
                    <AdminUserDetail />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/expeditions/:id"
                element={
                  <ProtectedAdminRoute>
                    <AdminShipmentDetail />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/admin/commandes/:id" element={
                <ProtectedAdminRoute>
                  <AdminOrderDetail />
                </ProtectedAdminRoute>} 
              />
            </Routes>
          </main>

          <Footer />
          <CartDrawer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;