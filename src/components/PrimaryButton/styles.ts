import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

export const ButtonContainer = styled(TouchableOpacity)<{
  borderColor?: string;
  backgroundColor?: string;
}>`
  height: 50px;
  width: 100%;
  border-radius: 8px;
  margin-top: 16px;
  justify-content: center;
  border-color: ${({borderColor}) => borderColor || colors.grey.s400};
  border-width: 1px;
  background-color: ${({backgroundColor}) =>
    backgroundColor || colors.inputBorder.s100};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.white};
  font-family: 'Poppins-Light';
  text-align: center;
  font-size: 16px;
`;
