import React, {useCallback, useState} from 'react';
import {Container, FormContainer, InputContainer, Info} from './styles';
import {Input, Button} from 'react-native-elements';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/core';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';

const Register: React.FC = () => {
  const [cpf, setCPF] = useState('');
  const [cpfError, setCPFError] = useState('');

  const navigation = useNavigation();

  const handleSubmit = useCallback(async () => {
    if (cpf.length !== 11) {
      setCPFError('O CPF precisa ter 11 dígitos');
    } else {
      setCPFError('');

      try {
        await api.post('/customers', {cpf});

        navigation.goBack();

        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'CPF cadastrado com sucesso',
          position: 'bottom',
        });
      } catch (error) {
        console.log('esse é o erro => ', JSON.stringify(error));
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: error.response.data,
          position: 'top',
        });
      }
    }
  }, [cpf, navigation]);

  return (
    <Container>
      <Info>
        No sistema de pontos, cada compra que você faz no seu CPF gera um ponto,
        e você pode trocar os pontos por produtos
      </Info>
      <FormContainer>
        <InputContainer>
          <Input
            label="CPF"
            value={cpf}
            onChangeText={value => setCPF(value)}
            errorMessage={cpfError}
            keyboardType="number-pad"
            placeholder="Digite seu CPF"
            autoCompleteType
          />
        </InputContainer>
        <Button
          buttonStyle={{backgroundColor: 'green'}}
          title="Cadastrar"
          onPress={handleSubmit}
        />
      </FormContainer>
    </Container>
  );
};

export default Register;
