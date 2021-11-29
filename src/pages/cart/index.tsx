import React, {useCallback} from 'react';
import {Container, ItemsContainer, Register, ButtonsContainer} from './styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import Item from './item';
import {Header, Button} from 'react-native-elements';
import {useCart} from '../../hooks/cart';
import {useNavigation} from '@react-navigation/core';
import api from '../../services/api';
import Toast from 'react-native-toast-message';

const Products: React.FC = () => {
  const {products} = useCart();

  const navigation = useNavigation();

  const handleSubmit = useCallback(async () => {
    try {
      await api.post('orders', {
        products: products.map(p => ({productId: p.id, quantity: p.quantity})),
      });

      Toast.show({
        text1: 'Sucesso',
        text2: 'Pedido efetuado com sucesso',
        type: 'success',
      });
    } catch {
      Toast.show({
        text1: 'Error',
        text2: 'Ocorreu um erro ao realizar pedido',
        type: 'success',
      });
    }
  }, [products]);

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

        <ButtonsContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={{marginBottom: 20}}>
            <Register>
              Ainda não é inscrito no nosso programa de pontos? Cadastre-se
            </Register>
          </TouchableOpacity>
          <Button
            buttonStyle={{backgroundColor: 'green'}}
            title="Efetuar pedido"
            onPress={handleSubmit}
          />
        </ButtonsContainer>
      </ScrollView>
    </Container>
  );
};

export default Products;
