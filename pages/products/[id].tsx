import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../index.module.css";
import { Product, getProduct } from "../../lib/product";
import { CartItem } from "../../lib/cart";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";
import { createWriteStream } from "fs";

const ProductDetailPage: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();
  const id = router.query.id as string;
  // const myStorage = localStorage;
  // const mycart = localStorage.getItem("cart");

  useEffect(() => {
    const mycart = localStorage.getItem("cart");
    if (!id) {
      return;
    }
    getProduct(id).then((product) => setProduct(product));
    if (mycart !== null) {
      console.log(mycart);
      setCart(JSON.parse(mycart));
    }
  }, [id]);
  useEffect(() => {
    const mycart = localStorage.getItem("cart");
    if (cart !== null) {
      console.log(cart);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
    }

  }, [cart])

  function handleClick() {
    if (product !== null) {
      if (cart.length !== 0) {
        cart.map((cartitem, i) => {
          if (cartitem.product.id === product.id) {
            cartitem.quantity += 1;
            return;
          }
        });
      }
      if (! cart.find(item => item.product.id === product.id)) {
        console.log("this is new item");
        setCart([
        ...cart,
        {
          product: product,
          quantity: 1,
        },
      ]);
      }
      console.log(cart);
      // localStorage.removeItem("cart");
      // localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name}をカートに入れました`);
    }
  }
  if (product === null) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="img">
        {product.imageUrl ? <img className="recipeImage" src={product.imageUrl} alt="" width="300" /> : null}
      </div>
      <h1>{product.name ? product.name : null}</h1>
      <h2>{product.price ? product.price : null}</h2>
      <p>{product.description ? product.description : null}</p>
      <button onClick={handleClick}>購入する</button>
    </Layout>
  );
};

export default ProductDetailPage;
