import React from 'react';
import {Container, ItemsContainer, Register} from './styles';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import Item from './item';
import {Header} from 'react-native-elements';
import {useCart} from '../../hooks/cart';
import {useNavigation} from '@react-navigation/core';

const Products: React.FC = () => {
  const {products} = useCart();

  const navigation = useNavigation();

  return (
    <Container>
      <Header
        containerStyle={{justifyContent: 'center'}}
        placement="left"
        centerComponent={{
          text: 'Restaurante Tech',
          style: {color: '#fff', fontSize: 22},
        }}
      />
      <ScrollView>
        <ItemsContainer>
          {products.map(product => (
            <Item key={product.id} product={product} />
          ))}
        </ItemsContainer>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Register>
            Ainda não é inscrito no nosso programa de pontos? Cadastre-se
          </Register>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default Products;
