import React, {createContext, useCallback, useContext, useState} from 'react';
import database from '@react-native-firebase/database';
import {Overlay} from 'react-native-elements';
import OrderNotification from './orderNotification';

interface OrderContextData {
  addOrder(orderId: string): void;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const Order: React.FC = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);

  const addOrder = useCallback((id: string) => {
    const db = database();
    const newOrdersRef = db.ref('/NewOrders');

    newOrdersRef.on('child_changed', snapshot => {
      const childChanged = snapshot.val();

      if (childChanged.id === id) {
        if (childChanged.ready) {
          setIsVisible(true);
        }
      }
    });
  }, []);

  const handleOnClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <OrderContext.Provider value={{addOrder}}>
      <>
        <Overlay
          isVisible={isVisible}
          onBackdropPress={handleOnClose}
          overlayStyle={{
            padding: 0,
            flex: 1,
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
            justifyContent: 'center',
          }}>
          <OrderNotification handleOnClose={handleOnClose} />
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
