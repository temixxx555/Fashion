import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./layouts/layout";
import Collectionspage from "./Pages/CollectionsPage"; // Ensure the import path is correct
import Collection from "./components/Collection"; // Import your Collection component if it's a separate page
import FitnessSupplement from "./Pages/FitnessSupplements";
import MasonPage from "./Pages/MasonPage";
import ItemPage from "./Pages/ItemPage";
import Jerseys from "./Pages/Jerseys";
import BottomPage from "./Pages/BotttomsPage";
import TshirtPage from "./Pages/TshirtPage";
import FootWearPage from "./Pages/FootWearPage";
import WomenPage from "./Pages/WomenPage";
import AccesoriesPage from "./Pages/AccesoriesPage";

const AppRoutes = () => {
  return (
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
      {/* Individual Collection Page */}
      <Route
        path='/collectionpage/:id'
        element={
          <Layout>
            <Collectionspage />
          </Layout>
        }
      />{" "}
      {/* Individual collection item page */}
      {/* Individual Collection Page */}
      <Route
        path='/Mason/:id'
        element={
          <Layout>
            <MasonPage />
          </Layout>
        }
      />{" "}
      {/* Individual collection item page */}
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
      {/* Catch-all route to redirect to home */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
