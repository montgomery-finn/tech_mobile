import styled from 'styled-components/native';

import {
  Card as ElementCard,
  Image as ElementImage,
} from 'react-native-elements';

export const Card = styled(ElementCard)`
  width: 200px;
  background-color: blue;
`;

export const Image = styled(ElementImage)`
  width: 100%;
  height: 160px;
`;

export const InfoContainer = styled.View`
  padding: 10px;
  flex-direction: column;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #000;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 5px;
`;
