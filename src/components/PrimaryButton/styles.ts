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
  margin-top: 10px;
  justify-content: center;
  border-color: ${({borderColor}) => borderColor || colors.grey.s400};
  border-width: 1px;
  background-color: ${({backgroundColor}) =>
    backgroundColor || colors.inputSearch.s100};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.white};
  font-family: 'Poppins-Regular';
  letter-spacing: 1.5px;
  text-align: center;
  font-size: 16px;
`;
