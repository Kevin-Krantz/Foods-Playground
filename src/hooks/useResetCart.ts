import {
  useGetCartQuery,
  useAddToCartMutation,
} from "../store/services/rtkApi";
import { ICartResponse } from "../store/types/ICart";

export const useResetCart = () => {
  const { data: cartData, refetch } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();

  const resetCart = async () => {
    try {
      await refetch();
      const cart = cartData as ICartResponse;
      for (const item of cart.items) {
        await addToCart({
          foodId: item._id,
          quantity: -item.quantity,
        }).unwrap();
      }
    } catch (error) {
      console.error("Error resetting cart:", error);
    }
  };

  return resetCart;
};
