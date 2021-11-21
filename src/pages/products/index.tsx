import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {Container, ItemsContainer} from './styles';
import ProductDTO from '../../DTOs/productDTO';
import {ScrollView, View} from 'react-native';
import Item from './item';
import {Badge, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useCart} from '../../hooks/cart';

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
    console.log('ta chegando aqui');
    getData();
  }, []);

  const {products: cartProducts} = useCart();

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
          <View style={{padding: 10}}>
            <Icon name="shopping-cart" size={30} color="#fff" />
            <Badge
              status="error"
              value={cartProducts.length}
              containerStyle={{position: 'absolute', top: 2, right: 0}}
            />
          </View>
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
