import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from '../pages/products';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={Products}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default App;
