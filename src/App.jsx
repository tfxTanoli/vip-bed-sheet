import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AdminRoute from "./components/AdminRoute";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ProductsProvider } from "./context/ProductsContext";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import LegalPage from "./pages/LegalPage";
import ReturnsPage from "./pages/ReturnsPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import FavoritesPage from "./pages/FavoritesPage";

// Dashboard Components
import DashboardLayout from "./dashboard/components/DashboardLayout";
import DashboardHome from "./dashboard/pages/DashboardHome";
import ProductsPage from "./dashboard/pages/ProductsPage";
import OrdersPage from "./dashboard/pages/OrdersPage";
import CustomersPage from "./dashboard/pages/CustomersPage";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <FavoritesProvider>
          <ProductsProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
                <Routes>
                  {/* Admin Dashboard Routes */}
                  <Route path="/dashboard" element={
                    <AdminRoute>
                      <DashboardLayout />
                    </AdminRoute>
                  }>
                    <Route index element={<DashboardHome />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                  </Route>

                  {/* Public Website Routes */}
                  <Route element={<PublicLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/terms" element={<LegalPage defaultTab="terms" />} />
                    <Route path="/privacy" element={<LegalPage defaultTab="privacy" />} />
                    <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                    <Route path="/returns" element={<ReturnsPage />} />
                  </Route>
                </Routes>
              </Router>
            </CartProvider>
          </ProductsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
