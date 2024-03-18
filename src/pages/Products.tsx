import { useEffect, useState } from "react";
import Product from '../types/productType'

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://reqres.in/api/products?page=1");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const productsList = products.map((product: Product) => {
    return (
        <div key={product.id} className="border p-4" style={{backgroundColor: product.color}}>
        <h3 className="text-xl">{product.name}</h3>
        <p>Year: {product.year}</p>
        <p>ID: {product.id}</p>
        <p>Color: {product.color}</p>
        </div>
    )
  })

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productsList}
      </div>
    </div>
  );
}

export default Products;
