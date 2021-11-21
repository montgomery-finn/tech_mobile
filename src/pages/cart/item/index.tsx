import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Image, InfoContainer, Title} from './styles';
import {Card, Text, Button} from 'react-native-elements';
import {CartProduct} from '../../../hooks/cart';
import {useCart} from '../../../hooks/cart';

interface ItemProps {
  product: CartProduct;
}

const Item: React.FC<ItemProps> = ({product}) => {
  const {removeProduct} = useCart();

  return (
    <Card key={product.id} containerStyle={{width: 300, padding: 0}}>
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
        <Text>Quantidade: {product.quantity}</Text>
        <Button
          containerStyle={{marginTop: 10}}
          buttonStyle={{backgroundColor: 'red'}}
          title="Remover do carrinho"
          onPress={() => removeProduct(product)}
        />
      </InfoContainer>
    </Card>
  );
};

export default Item;
