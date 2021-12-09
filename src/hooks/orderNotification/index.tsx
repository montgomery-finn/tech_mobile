import React from 'react';
import {Container, Text} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';

interface NotificationProps {
  handleOnClose(): void;
}

const Notification: React.FC<NotificationProps> = ({handleOnClose}) => {
  return (
    <Container>
      <Icon
        name="check-circle"
        size={200}
        style={{color: 'white', marginBottom: 20}}
      />
      <Text>
        O seu pedido está pronto. Por favor, dirija-se ao caixa para retirá-lo!
      </Text>
      <Button title="Ok" onPress={handleOnClose} />
    </Container>
  );
};

export default Notification;
