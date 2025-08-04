import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import ProtectedRoutes from './components/ProtectedRoutes';
import Basket from './components/Basket';
import Order from './components/Order';
import AdminPanel from './components/Admin/AdminPanel';
import Orders from './components/Admin/Orders';
import AdminProducts from './components/Admin/AdminProducts';
import AdminHome from './components/Admin/AdminHome';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product/:productId" element={<ProductDetail />} />


        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<AdminHome />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
         
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
