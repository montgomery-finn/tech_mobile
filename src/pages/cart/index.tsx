import React, {useCallback, useState} from 'react';
import {
  Container,
  ItemsContainer,
  Register,
  ButtonsContainer,
  Alert,
  Content,
} from './styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import Item from './item';
import {Header, Button, Input} from 'react-native-elements';
import {useCart} from '../../hooks/cart';
import {useNavigation} from '@react-navigation/core';
import api from '../../services/api';
import Toast from 'react-native-toast-message';
import database from '@react-native-firebase/database';
import {useOrders} from '../../hooks/orders';

interface ResponseDTO {
  id: string;
}

const Products: React.FC = () => {
  const {products, clear} = useCart();

  const navigation = useNavigation();

  const [cpf, setCPF] = useState('');
  const [cpfError, setCPFError] = useState('');

  const {addOrder} = useOrders();

  const handleSubmit = useCallback(async () => {
    try {
      const result = await api.post<ResponseDTO>('orders', {
        cpf,
        products: products.map(p => ({
          productId: p.id,
          quantity: p.quantity,
        })),
      });

      database()
        .ref(`/NewOrders/${result.data.id}`)
        .set({
          id: result.data.id,
          ready: '',
        })
        .then(() => console.log('Data set.'));

      addOrder(result.data.id);

      navigation.goBack();

      Toast.show({
        text1: 'Sucesso',
        text2: 'Pedido efetuado com sucesso',
        type: 'success',
      });
      clear();
    } catch {
      Toast.show({
        text1: 'Error',
        text2: 'Ocorreu um erro ao realizar pedido',
        type: 'error',
      });
    }
  }, [addOrder, clear, cpf, products]);

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
      <Content>
        {products.length === 0 ? (
          <Alert>Adicione produtos ao carrinho e eles aparecerão aqui</Alert>
        ) : (
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
              <Input
                label="CPF"
                value={cpf}
                onChangeText={value => setCPF(value)}
                errorMessage={cpfError}
                keyboardType="number-pad"
                placeholder="Digite seu CPF"
                autoCompleteType
              />
              <Button
                buttonStyle={{backgroundColor: 'green'}}
                title="Efetuar pedido"
                onPress={handleSubmit}
              />
            </ButtonsContainer>
          </ScrollView>
        )}
      </Content>
    </Container>
  );
};

export default Products;
