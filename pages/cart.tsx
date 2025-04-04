import { FC, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { listProducts, Product } from "../lib/product";
import { Layout } from "../components/Layout";
import { CartItem, clearCart, getCartItemCount } from "../lib/cart";
import { useRouter } from "next/dist/client/router";
import cartstyles from "./cart.module.css";

const CartPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allItemQuantity, setAllItemQuantity] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();
  const amount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    listProducts().then((products) => setProducts(products));
    setAllItemQuantity(getCartItemCount());
    const mycart = localStorage.getItem("cart");
    if (mycart !== null) {
      setCart(JSON.parse(mycart));
    }
  }, []);

  function handleClick() {
    clearCart();
    alert("注文が完了しました");
    router.push("/")

  }
  function changeamount(id: string, command: string) {

  }

  return (
    <Layout cartItemCount={ allItemQuantity}>
      <ul className={styles.list}>
        {cart.map((cartItem) => (
          <li key={cartItem.product.id} className={styles.listItem}>
            {/* このリンク先はないので新規ページを作る */}
            <Link href={`/products/${cartItem.product.id}`}>
              <a className={styles.link}>
                <div className={styles.imageWrapper}>
                  <img className={styles.image} src={cartItem.product.imageUrl} alt={`${cartItem.product.name}の写真`} />
                  <div className={styles.price}>{cartItem.product.price}円</div>
                </div>
                <div className={styles.productName}>{cartItem.product.name}</div>
                <div >{cartItem.quantity}個</div>
                <div className={cartstyles.addbuttons} >
                  <button className={cartstyles.changecountbutton}>+</button>
                  <button className={cartstyles.changecountbutton}>-</button>

                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className={cartstyles.amount}>合計{amount}円</div>
      <div className={cartstyles.buttonwrapper}>
        <button className={ cartstyles.commonbutton} onClick={handleClick}>購入する</button>
      </div>
    </Layout>
  );
};

export default CartPage;
