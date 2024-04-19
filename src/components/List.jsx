import { useProducts } from "../context/ProductContext";

function List() {
  const { products, addItemToCart } = useProducts();
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

export default List;
