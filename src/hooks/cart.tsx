import React, {createContext, useCallback, useContext, useState} from 'react';
import ProductDTO from '../DTOs/productDTO';

export interface CartProduct extends ProductDTO {
  quantity: number;
}

interface CartContextData {
  addProduct(product: ProductDTO): void;
  removeProduct(product: ProductDTO): void;
  decrementProduct(product: ProductDTO): void;
  products: CartProduct[];
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const Cart: React.FC = ({children}) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProduct = useCallback((product: ProductDTO) => {
    setProducts(value => {
      const item = value.find(i => i.id === product.id);

      if (item) {
        item.quantity++;
        return [...value];
      } else {
        return [...value, {...product, quantity: 1}];
      }
    });
  }, []);

  const removeProduct = useCallback((product: ProductDTO) => {
    setProducts(value => [...value.filter(i => i.id !== product.id)]);
  }, []);

  const decrementProduct = useCallback((product: ProductDTO) => {
    setProducts(value => {
      const item = value.find(i => i.id === product.id);

      if (item && item.quantity > 1) {
        item.quantity--;
        return [...value];
      } else {
        return [...value.filter(i => i.id !== product.id)];
      }
    });
  }, []);

  return (
    <CartContext.Provider
      value={{products, addProduct, removeProduct, decrementProduct}}>
      {children}
    </CartContext.Provider>
  );
};

export default Cart;

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be within a ToastContextProvider');
  }

  return context;
}
