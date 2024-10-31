import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./layouts/layout";
// Ensure the import path is correct
import Collection from "./components/Collection"; // Import your Collection component if it's a separate page
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

const AppRoutes = () => {
  return (
    <CartProvider>
    <Routes>
      {/* Home Page */}
      <Route
        path='/'
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      {/* Fitness page */}
      <Route
        path='/fitness'
        element={
          <Layout>
            <FitnessSupplement />
          </Layout>
        }
      />
      {/* Jersey page */}
      <Route
        path='/jersey'
        element={
          <Layout>
            <Jerseys />
          </Layout>
        }
      />
      {/* Bottoms page */}
      <Route
        path='/bottoms'
        element={
          <Layout>
            <BottomPage />
          </Layout>
        }
      />
      {/* women page */}
      <Route
        path='/women'
        element={
          <Layout>
            <WomenPage />
          </Layout>
        }
      />
      {/* tshirts page */}
      <Route
        path='/tshirts'
        element={
          <Layout>
            <TshirtPage />
          </Layout>
        }
      />
      {/* footwear page */}
      <Route
        path='/footwear'
        element={
          <Layout>
            <FootWearPage />
          </Layout>
        }
      />
      {/* Accessories page */}
      <Route
        path='/accesories'
        element={
          <Layout>
            <AccesoriesPage />
          </Layout>
        }
      />
      {/* Collections Page */}
      <Route path='/collections' element={<Collection />} />{" "}
      {/* Adjusting the path */}
      {/* Individual Item Page */}
      <Route
        path='/:category/:id'
        element={
          <Layout>
            <ItemPage />
          </Layout>
        }
      />{" "}
      {/* Individual Item item page */}
      {/*checkout*/}
      <Route
        path='checkout'
        element={
          <Layout>
            <CheckOutPage />
          </Layout>
        }
      />{" "}
      
      {/* Catch-all route to redirect to home */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
    </CartProvider>
  );
};

export default AppRoutes;
