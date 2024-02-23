import styled from 'styled-components/native';
import colors from '../../styles/colors';

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
  height: 30px;
  width: 30px;
  right: 0;
  top: 0;
`;

export const CloseIconButon = styled.Pressable`
  position: absolute;
  height: 30px;
  width: 30px;
  right: 0;
  top: 0;
  opacity: 1;
`;

export const TextInputWithBorderBottom = styled.TextInput`
  background-color: ${colors.inputBorder.s100};
  font-family: 'Poppins-ExtraLight';
  padding-left: 10px;
  margin-top: 45px;
  border-radius: 6px;
  font-size: 16px;
`;

export const TextAreaWithBorder = styled.TextInput`
  background-color: ${colors.inputBorder.s100};
  font-family: 'Poppins-ExtraLight';
  text-align-vertical: top;
  padding-left: 10px;
  margin-top: 25px;
  font-size: 16px;
  opacity: 1;
  height: 130px;
  border-radius: 6px;
`;

export const ButtonsContainer = styled.View`
  margin-top: 20px;
`;

export const ErrorLength = styled.Text`
  color: red;
  font-size: 13px;
`;

export const Title = styled.Text`
  color: ${colors.grey.s200};
  font-size: 19px;
`;
