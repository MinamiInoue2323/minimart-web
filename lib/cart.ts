import { graphqlRequest } from "./graphqlClient";
import { Product } from "./product";
export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};
export function getCartItemCount(): number{
  const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  var count: number = 0;
  cartItems.map((item) => {
    count += item.quantity


  })
  return count


}
