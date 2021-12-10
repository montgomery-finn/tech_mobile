import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from '../pages/products';
import Cart from '../pages/cart';
import Register from '../pages/register';
import Points from '../pages/points';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={Products}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        options={{
          headerTitle: 'Carrinho de compras',
        }}
        component={Cart}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerTitle: 'Cadastrar-se'}}
      />
      <Stack.Screen
        name="Points"
        options={{headerTitle: 'Sistema de pontos'}}
        component={Points}
      />
    </Stack.Navigator>
  );
};

export default App;
