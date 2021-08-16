import { graphqlRequest } from "./graphqlClient";
import { Product } from "./product";
export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};
