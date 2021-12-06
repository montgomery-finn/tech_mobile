import React, {createContext, useCallback, useContext, useState} from 'react';
import database from '@react-native-firebase/database';
import {Overlay, Text} from 'react-native-elements';

interface OrderContextData {
  addOrder(orderId: string): void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const Order: React.FC = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);

  const addOrder = useCallback((id: string) => {
    try {
      database()
        .ref(`/NewOrders/${id}`)
        .on('value', snapshot => {
          if (snapshot) {
            console.log('aaaaaaaaaaa');
            const {ready} = snapshot.val();

            if (ready) {
              setIsVisible(true);
            }
          }
        });
    } catch {}
  }, []);

  return (
    <OrderContext.Provider value={{addOrder}}>
      <>
        <Overlay
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}>
          <Text>
            O seu pedido está pronto. Por favor, dirija-se ao caixa para
            retirá-lo!
          </Text>
        </Overlay>
        {children}
      </>
    </OrderContext.Provider>
  );
};

export default Order;

export function useOrders(): OrderContextData {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrdert must be within a OrderContextData');
  }

  return context;
}
