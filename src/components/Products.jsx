import { useProducts } from "../context/ProductContext";

import Loader from "./Loader";
import List from "./List";

function Products() {
  const { products, isLoading } = useProducts();
  if (isLoading) return <Loader />;

  if (!isLoading && products.length > 0)
    return (
      <div className="products__container">
        <List />
      </div>
    );
}

export default Products;
