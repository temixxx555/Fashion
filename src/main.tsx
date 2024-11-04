import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { CartProvider } from "./components/CartContext";
import ScrollToTop from "./ScrollToTop.tsx";
import { UserProvider } from "./components/UserProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <CartProvider>
      <UserProvider>
      <ScrollToTop />
        <AppRoutes />
        </UserProvider>
      </CartProvider>
    
    </Router>
  </StrictMode>
);
