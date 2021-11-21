import React, {createContext, useCallback, useContext, useState} from 'react';
import ProductDTO from '../DTOs/productDTO';

interface CartContextData {
  addProduct(product: ProductDTO): void;
  removeProduct(product: ProductDTO): void;
  products: ProductDTO[];
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const Cart: React.FC = ({children}) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const addProduct = useCallback((product: ProductDTO) => {
    console.log('aa');
    setProducts(value => [...value, product]);
  }, []);

  const removeProduct = useCallback((product: ProductDTO) => {
    setProducts(value => value.filter(p => p.id !== product.id));
  }, []);

  return (
    <CartContext.Provider value={{products, addProduct, removeProduct}}>
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
