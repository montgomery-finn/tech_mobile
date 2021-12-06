import React, {createContext, useCallback, useContext, useState} from 'react';
import {Text} from 'react-native';
import {Overlay} from 'react-native-elements';

interface NotificationsContextData {
  show(): void;
}

const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData,
);

const Notifications: React.FC = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => {}, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <NotificationsContext.Provider value={{show}}>
      {children}
      <Overlay isVisible={isVisible} onBackdropPress={hide}>
        <Text>Seu pedido está pronto para ser retirado</Text>
      </Overlay>
    </NotificationsContext.Provider>
  );
};

export default Notifications;

export function useCart(): NotificationsContextData {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error('useNotifications must be within a NotificationsProvider');
  }

  return context;
}
