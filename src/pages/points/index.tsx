import React, {useCallback, useState} from 'react';
import {Button, Input} from 'react-native-elements';
import {Container, Info, TypeCPF, PointsText, Register} from './styles';
import api from '../../services/api';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Points: React.FC = () => {
  const [cpf, setCPF] = useState('');
  const [cpfError, setCPFError] = useState('');

  const [points, setPoints] = useState<number>();

  const handleSubmit = useCallback(async () => {
    const response = await api.get<number>(`customers/points/${cpf}`);

    setPoints(response.data);
  }, [cpf]);

  const navigation = useNavigation();

  return (
    <Container>
      <Info>
        No sistema de pontos, cada compra que você faz no seu CPF gera um ponto,
        e você pode trocar os pontos por produtos
      </Info>
      <TypeCPF>
        Digite seu CPF para conferir quantos pontos você tem acumulado:
      </TypeCPF>
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
        buttonStyle={{
          backgroundColor: 'green',
          width: 200,
          alignSelf: 'center',
          marginBottom: 20,
        }}
        title="Verificar"
        onPress={handleSubmit}
      />
      {points !== undefined ? (
        <PointsText>
          Você possui {points} pontos. Para utilizá-los, basta informar ao caixa
          na hora de pagar um pedido
        </PointsText>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{marginBottom: 20}}>
          <Register>
            Ainda não é inscrito no nosso programa de pontos? Cadastre-se
          </Register>
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default Points;
