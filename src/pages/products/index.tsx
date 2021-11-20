import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {Container, ItemsContainer, Image} from './styles';
import ProductDTO from '../../DTOs/productDTO';
import {Card, Text} from 'react-native-elements';
import {ActivityIndicator, ScrollView} from 'react-native';

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

  return (
    <Container>
      <ScrollView>
        <ItemsContainer>
          {products.map(product => (
            <Card key={product.id} containerStyle={{width: 300, padding: 0}}>
              <Image
                source={{
                  uri: `http://localhost:28464/image/${product.fileName}`,
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text>{product.name}</Text>
              <Text>Preço: R$ {product.price}</Text>
              <Text>Preço em pontos: {product.priceInPoints}</Text>
            </Card>
          ))}
        </ItemsContainer>
      </ScrollView>
    </Container>
  );
};

export default Products;
