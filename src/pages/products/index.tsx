import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {Container, ItemsContainer, TopButtonsContainer} from './styles';
import ProductDTO from '../../DTOs/productDTO';
import {ScrollView, TouchableOpacity} from 'react-native';
import Item from './item';
import {Badge, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useCart} from '../../hooks/cart';
import {useNavigation} from '@react-navigation/native';

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get<ProductDTO[]>('/products2');

        setProducts(response.data);
      } catch (error) {
        console.log('aqui está o erro =>', JSON.stringify(error));
      }
    }
    getData();
  }, []);

  const {products: cartProducts} = useCart();

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
        rightComponent={
          <TopButtonsContainer>
            <TouchableOpacity
              style={{padding: 10, marginRight: 10}}
              onPress={() => {
                navigation.navigate('Points');
              }}>
              <Icon name="donate" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Icon name="shopping-cart" size={30} color="#fff" />
              <Badge
                status="error"
                value={cartProducts.length}
                containerStyle={{position: 'absolute', top: 2, right: 0}}
              />
            </TouchableOpacity>
          </TopButtonsContainer>
        }
      />
      <ScrollView>
        <ItemsContainer>
          {products.map(product => (
            <Item key={product.id} product={product} />
          ))}
        </ItemsContainer>
      </ScrollView>
    </Container>
  );
};

export default Products;
