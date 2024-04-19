import { useProducts } from "../context/ProductContext";

import CartHeader from "./CartHeader";
import CartList from "./CartList";

function Cart() {
  const { cartItems } = useProducts();

  const cartTotalValue = cartItems
    .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    .toFixed(0);

  return (
    <div className="cart__container">
      <CartHeader />
      <CartList />
      <p className="cart__total__value">Total: ${cartTotalValue}</p>
    </div>
  );
}

export default Cart;
