import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const marginTop = screenHeight * 0.07;

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary.s200};
  padding: 0 20px;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const Logo = styled.Image`
  width: 214px;
  height: 214px;
  align-self: center;
  margin-top: ${screenHeight * 0.25}px;
  position: absolute;
`;
