import { ICartResponse } from "../store/types/ICart";

export function isCartEmpty(cart: ICartResponse | undefined): boolean {
  return !cart || cart.items.length === 0;
}

export function getTotalQuantity(cart: ICartResponse | undefined): number {
  return cart
    ? cart.items.reduce((total, item) => total + item.quantity, 0)
    : 0;
}
