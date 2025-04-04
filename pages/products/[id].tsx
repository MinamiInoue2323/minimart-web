import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../index.module.css";
import productstyles from "../product.module.css";
import { Product, getProduct } from "../../lib/product";
import { CartItem, getCartItemCount } from "../../lib/cart";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/dist/client/router";
import { createWriteStream } from "fs";

const ProductDetailPage: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [allItemQuantity, setAllItemQuantity] = useState<number>(0);
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
    if (cart.length !== 0) {
      console.log("updated!");
    const mycart = localStorage.getItem("cart");
    if (cart !== null) {
      console.log(cart);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));

    }

    }
    setAllItemQuantity(getCartItemCount());



  }, [quantity])

  function handleClick() {
    if (product !== null) {
      if (cart.length !== 0) {
        cart.map((cartitem, i) => {
          if (cartitem.product.id === product.id) {
            cartitem.quantity += 1;
            setQuantity(cartitem.quantity)
            return;
          }
        });
      }
      if (!cart.find(item => item.product.id === product.id)) {
        setQuantity(1);
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
    <Layout cartItemCount={ allItemQuantity}>
      <div className={styles.imageWrapper}>
        {product.imageUrl ? <img className={productstyles.fullimage} src={product.imageUrl} alt=""  /> : null}
      </div>
      <h1>{product.name ? product.name : null}  {product.price ? product.price : null}円</h1>
      <p>{product.description ? product.description : null}</p>
      <div className={productstyles.buttonwrapper}>
        <button className={ productstyles.commonbutton}onClick={handleClick}>カートに入れる</button>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
