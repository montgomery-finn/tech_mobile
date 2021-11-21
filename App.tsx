import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Products from './src/pages/products';
import CartContext from './src/hooks/cart';
import Routes from './src/routes/index';
import {NavigationContainer} from '@react-navigation/native';
import {Container} from './styles';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <CartContext>
          <Container>
            <Routes />
          </Container>
        </CartContext>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
