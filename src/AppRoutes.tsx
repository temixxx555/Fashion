import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./layouts/layout";
import Collection from "./components/Collection";
import FitnessSupplement from "./Pages/FitnessSupplements";
import ItemPage from "./Pages/ItemPage";
import Jerseys from "./Pages/Jerseys";
import BottomPage from "./Pages/BotttomsPage";
import TshirtPage from "./Pages/TshirtPage";
import FootWearPage from "./Pages/FootWearPage";
import WomenPage from "./Pages/WomenPage";
import AccesoriesPage from "./Pages/AccesoriesPage";
import CheckOutPage from "./Pages/CheckOutPage";
import { CartProvider } from "./components/CartContext";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Admin from "./Pages/Admin";

const AppRoutes = () => {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fitness" element={<FitnessSupplement />} />
          <Route path="/jersey" element={<Jerseys />} />
          <Route path="/bottoms" element={<BottomPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/tshirts" element={<TshirtPage />} />
          <Route path="/footwear" element={<FootWearPage />} />
          <Route path="/accesories" element={<AccesoriesPage />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/:category/:id" element={<ItemPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<LoginPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
};

export default AppRoutes;
