import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${colors.white};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding: 20px;
  width: 100%;
  height: 70%;
`;

export const CloseIcon = styled.Image`
  position: absolute;
  height: 25px;
  width: 25px;
  right: 0;
  top: 0;
  opacity: 0.5;
`;

export const TextInputWithBorderBottom = styled.TextInput`
  border-color: ${colors.primary.s100};
  border-color: ${colors.primary.s100};
  background-color: ${colors.grey.s100};
  font-family: 'Poppins-ExtraLight';
  border-width: 0.4px;
  padding-left: 10px;
  margin-top: 50px;
  border-radius: 6px;
  font-size: 18px;
  opacity: 0.6;
`;

export const TextAreaWithBorder = styled.TextInput`
  border-color: ${colors.primary.s100};
  background-color: ${colors.grey.s100};
  border-width: 0.4px;
  font-family: 'Poppins-ExtraLight';
  text-align-vertical: top;
  padding-left: 10px;
  margin-top: 20px;
  font-size: 16px;
  opacity: 0.6;
  height: 200px;
  border-radius: 6px;
`;

export const ButtonsContainer = styled.View``;

export const ErrorLength = styled.Text`
  color: ${colors.error.s200};
  font-size: 12px;
`;
