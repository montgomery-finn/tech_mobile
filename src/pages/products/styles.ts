import styled from 'styled-components/native';
import {
  Card as ElementCard,
  Image as ElementImage,
} from 'react-native-elements';

export const Container = styled.View`
  height: 100%;
`;

export const ItemsContainer = styled.View`
  flex-direction: row;
`;

export const Card = styled(ElementCard)`
  width: 200px;
  background-color: blue;
`;

export const Image = styled(ElementImage)`
  width: 100%;
  height: 160px;
`;
