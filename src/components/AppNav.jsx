import { NavLink, Outlet } from "react-router-dom";

import { useProducts } from "../context/ProductContext";

function AppNav() {
  const { cartItems } = useProducts();
  return (
    <>
      <nav>
        <ul className="nav__lists">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart">
              Cart{" "}
              {cartItems.length > 0 && <span>{`(${cartItems.length})`}</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default AppNav;
