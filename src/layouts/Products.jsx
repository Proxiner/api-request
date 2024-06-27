import React, { useEffect, useState } from "react";
import "./Products.css";

import { MdOutlineAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";

function Products() {
  const [products, setProducts] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=3&limit=12")
      .then((response) => response.json())
      .then((output) => setProducts(output));
  }, []);

  const sortedProductsAsc = [...products].sort((a, b) => a.price - b.price);
  const sortedProductsDesc = [...products].sort((a, b) => b.price - a.price);

  return (
    <div className="products-container">
      <ul className="filter">
        <li onClick={() => setSorted(true)}> Desc </li>
        <li onClick={() => setSorted(false)}> Asc </li>
      </ul>

      {sorted
        ? sortedProductsDesc.map((srtProduct) => (
            <div key={srtProduct.id} className="product-container">
              <div className="grid">
                <img src={srtProduct.images[0]} alt="" />
                <h2>
                  {srtProduct.title.slice(0, 20)}
                  <h3> {srtProduct.description.slice(0, 125)} </h3>
                </h2>
                <span> {srtProduct.price}$ </span>
              </div>
            </div>
          ))
        : sortedProductsAsc.map((product) => (
            <div key={product.id} className="product-container">
              <div className="grid">
                <img src={product.images[0]} alt="" />
                <h2>
                  {product.title.slice(0, 20)}
                  <h3> {product.description.slice(0, 125)} </h3>
                </h2>
                <span> {product.price}$ </span>
              </div>
              <div className="add-to-cart">
                <button onClick={ () => setCartCounter(cartCounter => cartCounter - 1)}> <FiMinus /> </button>
                <h5> {cartCounter} </h5>
                <button onClick={ () => setCartCounter(cartCounter => cartCounter + 1)}> <MdOutlineAdd /> </button>
              </div>
            </div>
          ))}
    </div>
  );
}

export default Products;
