import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions, TextInputProps} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {height: viewPortHeight} = Dimensions.get('window');

interface TextInputWithBorderBottomProps extends TextInputProps {
  error?: boolean;
}

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${colors.background};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 16px;
  width: 100%;
  height: viewPortHeight / 1.8;
`;

export const CloseIcon = styled.Image`
  position: absolute;
  height: 25px;
  width: 25px;
  right: 0;
  top: 0;
  opacity: 0.5;
`;

export const TextInputWithBorderBottom = styled.TextInput<TextInputWithBorderBottomProps>`
  background-color: ${colors.inputSearch.s100};
  padding-left: 10px;

  border-radius: 6px;
  font-size: ${RFValue(16)}px;
`;

export const ButtonsContainer = styled.View``;

export const ErrorLength = styled.Text`
  color: ${colors.error.s200};
`;

export const Icon = styled.Image`
  width: 25px;
  height: 25px;
`;

export const InfoTitle = styled.Text`
  color: ${colors.grey.s200};
  font-size: 20px;
  letter-spacing: 1.5px;
  font-family: 'Poppins-Light';
  padding: 2px 0 20px 0;
`;

export const InfosWrapper = styled.View`
  margin-top: 8px;
`;

export const InfosContainer = styled.View`
  flex-direction: row;
  margin-bottom: 18px;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.grey.s200};
  font-size: ${RFValue(16)}px;
  margin-bottom: 8px;
  letter-spacing: 1.5px;
`;
export const ValueTitle = styled.Text`
  color: ${colors.grey.s200};
  font-size: ${RFValue(14)}px;
  font-weight: 300;
  letter-spacing: 1.5px;
  margin-left: 10px;
`;
