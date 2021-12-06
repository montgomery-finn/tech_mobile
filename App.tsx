import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CartContext from './src/hooks/cart';
import OrdersContext from './src/hooks/orders';
import Routes from './src/routes/index';
import {NavigationContainer} from '@react-navigation/native';
import {Container} from './styles';
import Toast from 'react-native-toast-message';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <OrdersContext>
            <CartContext>
              <Container>
                <Routes />
              </Container>
            </CartContext>
          </OrdersContext>
        </SafeAreaView>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
