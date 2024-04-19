/* eslint-disable react/prop-types */
import {} from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";

import Header from "./components/Header";
import AppNav from "./components/AppNav";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<AppNav />}>
              <Route index element={<Products />}></Route>
              <Route path="cart" element={<Cart />}></Route>
            </Route>
          </Routes>
        </ProductProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
