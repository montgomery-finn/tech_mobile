import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from '../pages/products';
import Cart from '../pages/cart';
import Register from '../pages/register';

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
        component={Cart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default App;
