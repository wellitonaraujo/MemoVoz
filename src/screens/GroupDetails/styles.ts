import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

export const ButtonContainer = styled.View`
  bottom: 20px;
  right: 20px;
  position: absolute;
`;
export const ListGroupTitle = styled.Text`
  font-size: 27px;
  color: ${colors.white};
  padding: 20px 0 20px 0;
`;

export const Logo = styled.Image`
  width: 214px;
  height: 214px;
  align-self: center;
  margin-top: ${screenHeight * 0.25}px;
  position: relative;
`;
