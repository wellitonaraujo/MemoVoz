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
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary.s100};

  font-family: 'Poppins-ExtraLight';
  padding-left: 10px;
  margin-top: 20px;
  border-radius: 6px;
  font-size: 18px;
  opacity: 0.6;
`;

export const ButtonsContainer = styled.View``;

export const ErrorLength = styled.Text`
  color: ${colors.error.s200};
  font-size: 12px;
`;

export const Icon = styled.Image`
  width: 25px;
  height: 25px;
`;

export const InfoTitle = styled.Text`
  color: ${colors.primary.s100};
  font-size: 22px;
  font-family: 'Poppins-Light';
  padding: 20px 0 15px 0;
`;

export const InfosContainer = styled.View`
  flex-direction: row;
  margin-bottom: 25px;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.primary.s100};
  font-size: 18px;
  margin-bottom: 8px;
`;
export const ValueTitle = styled.Text`
  color: ${colors.grey.s300};
  font-size: 18px;
  font-family: 'Poppins-ExtraLight';
  margin-left: 10px;
`;
