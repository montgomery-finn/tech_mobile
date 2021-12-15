import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ButtonsContainer = styled.View`
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
  width: 500px;
`;

export const Register = styled.Text`
  color: blue;
  text-decoration: underline;
`;

export const Alert = styled.Text`
  align-self: center;
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
`;
