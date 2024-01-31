import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';

export const ButtonContainer = styled(TouchableOpacity)<{
  borderColor?: string;
  backgroundColor?: string;
}>`
  height: 54px;
  width: 100%;
  border-radius: 8px;
  margin-top: 20px;
  justify-content: center;
  border-color: ${({borderColor}) => borderColor || colors.grey.s300};
  border-width: 1px;
  background-color: ${({backgroundColor}) =>
    backgroundColor || colors.primary.s200};
`;

export const ButtonText = styled.Text<{textColor?: string}>`
  color: ${({textColor}) => textColor || colors.white};
  text-align: center;
  font-size: 20px;
`;
