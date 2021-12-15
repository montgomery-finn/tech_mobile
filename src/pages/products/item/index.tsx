import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Image, InfoContainer, Title} from './styles';
import {Card, Text, Button} from 'react-native-elements';
import ProductDTO from '../../../DTOs/productDTO';
import {useCart} from '../../../hooks/cart';

interface ItemProps {
  product: ProductDTO;
}

const Item: React.FC<ItemProps> = ({product}) => {
  const {addProduct} = useCart();

  return (
    <Card key={product.id} containerStyle={{width: 290, padding: 0}}>
      <Image
        source={{
          uri: `http://localhost:28464/image/${product.fileName}`,
        }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <InfoContainer>
        <Title>{product.name}</Title>
        <Text>Preço: R$ {product.price}</Text>
        <Text>Preço em pontos: {product.priceInPoints}</Text>
        <Button
          containerStyle={{marginTop: 10}}
          title="Adicionar ao carrinho"
          onPress={() => addProduct(product)}
        />
      </InfoContainer>
    </Card>
  );
};

export default Item;
