/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // 1) check if cartItem exists
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  // 2) If exists increment the quantity
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  // 3) If not add item to the cart and add the quantity
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // 1) check if it exists in cart
  const existingCartItem = cartItems.find((c) => c.id === productToRemove.id);
  // 2) if exists reduce the quantity
  if (existingCartItem && existingCartItem.quantity > 1) {
    return cartItems.map((c) =>
      c.id === productToRemove.id ? { ...c, quantity: c.quantity - 1 } : c
    );
  }

  return [...cartItems];
};

const clearCartItem = (cartItems, productToClear) => {
  const newCartItems = cartItems.filter((c) => c.id !== productToClear.id);
  return [...newCartItems];
};

const ProductContext = createContext();

function ProductProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok)
          throw new Error(`something went wrong, please try after sometime.`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(`Error while fetching products: ${err.message}`);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  return (
    // 2) PROVIDE VALUE TO CHILD COMPONENTS
    <ProductContext.Provider
      value={{
        isLoading,
        products,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// So that is a very common pattern that many developers use these days
// So basically placing this context provider component and then the
// corresponding hook all into the same file.

function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");

  return context;
}

export { ProductProvider, useProducts };
