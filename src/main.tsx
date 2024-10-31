import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { CartProvider } from "./components/CartContext";
import ScrollToTop from "./ScrollToTop.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <CartProvider>
      <ScrollToTop />
        <AppRoutes />
      </CartProvider>
    </Router>
  </StrictMode>
);
