/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  NavLink,
  Outlet,
} from "react-router-dom";
// import { faker } from "@faker-js/faker";

// const intialData = [...Array(30)].map(() => ({
//   id: faker.string.uuid(),
//   name: faker.commerce.productName(),
//   description: faker.commerce.productDescription(),
//   price: faker.commerce.price(),
//   imageUrl: faker.image.urlLoremFlickr({ category: "nature" }),
// }));

function App() {
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
    // 1) check if cartItem exists
    const existingCartItem = cartItems.find(
      (item) => item.id === productToAdd.id
    );
    // 2) If exists increment the quantity
    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // 3) If not add item to the cart and add the quantity
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
  };

  const removeCartItem = (productToRemove) => {
    // 1) check if it exists in cart
    const existingCartItem = cartItems.find((c) => c.id === productToRemove.id);
    // 2) if exists reduce the quantity
    if (existingCartItem && existingCartItem.quantity > 1) {
      setCartItems(
        cartItems.map((c) =>
          c.id === productToRemove.id ? { ...c, quantity: c.quantity - 1 } : c
        )
      );
    } else {
      setCartItems([...cartItems]);
    }
  };

  const clearCartItem = (productToClear) => {
    const cartItem = cartItems.filter((c) => c.id !== productToClear.id);
    setCartItems([...cartItem]);
  };

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppNav cartItems={cartItems} />}>
            <Route
              index
              element={
                <Products
                  isLoading={isLoading}
                  products={products}
                  addItemToCart={addItemToCart}
                />
              }
            ></Route>
            <Route
              path="cart"
              element={
                <Cart
                  cartItems={cartItems}
                  addItemToCart={addItemToCart}
                  removeCartItem={removeCartItem}
                  clearCartItem={clearCartItem}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Header() {
  return <h1 className="header__title">React Context API</h1>;
}

function AppNav({ cartItems }) {
  const cartCount = cartItems.length;
  return (
    <>
      <nav>
        <ul className="nav__lists">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              Cart {cartCount > 0 && <span>{`(${cartCount})`}</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

function Products({ products, isLoading, addItemToCart }) {
  if (isLoading) return <Loader />;

  if (!isLoading && products.length > 0)
    return (
      <div className="products__container">
        <List products={products} addItemToCart={addItemToCart} />
      </div>
    );
}

// if isLoading is true we show loader
// if isLoading is false and products.length > 0 we show lists

function List({ products, addItemToCart }) {
  return (
    <>
      {products.map((p) => (
        <div className="card" key={p.id}>
          <img src={p.image} alt={p.title} />
          <div className="card__details">
            <h4 title={p.title} className="title">{`${p.title.slice(
              0,
              25
            )}...`}</h4>
            <p>${p.price.toFixed(0)}</p>
          </div>
          <div className="add__cart__btn">
            <button onClick={() => addItemToCart(p)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </>
  );
}

function Loader() {
  return <div className="loader"></div>;
}

function Cart({ cartItems, addItemToCart, removeCartItem, clearCartItem }) {
  const cartTotalValue = cartItems
    .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    .toFixed(0);

  return (
    <div className="cart__container">
      <CartHeader />
      <CartList
        cartItems={cartItems}
        addItemToCart={addItemToCart}
        removeCartItem={removeCartItem}
        clearCartItem={clearCartItem}
      />
      <p className="cart__total__value">Total: ${cartTotalValue}</p>
    </div>
  );
}

function CartHeader() {
  return (
    <div className="cart__container__header">
      <div className="cart__header">
        <span>Product</span>
      </div>
      <div className="cart__header">
        <span>Description</span>
      </div>
      <div className="cart__header">
        <span>Quantity</span>
      </div>
      <div className="cart__header">
        <span>Price</span>
      </div>
      <div className="cart__header">
        <span>Remove</span>
      </div>
    </div>
  );
}

function CartList({ cartItems, addItemToCart, removeCartItem, clearCartItem }) {
  return (
    <>
      {cartItems.length > 0 &&
        cartItems.map((c) => (
          <div className="cart__item__container" key={c.id}>
            <div className="image-container">
              <img src={c.image} alt={c.title} />
            </div>
            <p className="title" title={c.title}>{`${c.title.slice(
              0,
              15
            )}...`}</p>
            <div className="quantity">
              <span className="arrow" onClick={() => removeCartItem(c)}>
                &#10094;
              </span>
              <span className="value">{c.quantity}</span>
              <span className="arrow" onClick={() => addItemToCart(c)}>
                &#10095;
              </span>
            </div>
            <p>${c.price.toFixed(0)}</p>
            <div className="remove" onClick={() => clearCartItem(c)}>
              &#10005;
            </div>
          </div>
        ))}
    </>
  );
}

export default App;
