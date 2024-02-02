import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.grey.s500};
  padding: 20px;
`;

export const ButtonContainer = styled.View`
  bottom: 20px;
  right: 8px;
`;
export const ListGroupTitle = styled.Text`
  font-size: 33px;
  color: ${colors.white};
  padding-bottom: 20px;
`;

export const Logo = styled.Image`
  width: 214px;
  height: 214px;
  align-self: center;
  margin-top: ${screenHeight * 0.25}px;
  position: relative;
`;
