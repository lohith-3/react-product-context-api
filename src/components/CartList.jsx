import { useProducts } from "../context/ProductContext";

function CartList() {
  const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useProducts();
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
              <span className="arrow" onClick={() => removeItemFromCart(c)}>
                &#10094;
              </span>
              <span className="value">{c.quantity}</span>
              <span className="arrow" onClick={() => addItemToCart(c)}>
                &#10095;
              </span>
            </div>
            <p>${c.price.toFixed(0)}</p>
            <div className="remove" onClick={() => clearItemFromCart(c)}>
              &#10005;
            </div>
          </div>
        ))}
    </>
  );
}

export default CartList;
