import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
  align-items: center;
`;

export const ModalContent = styled.View`
  width: 100%;
  height: 70%;
  background-color: ${colors.white};
  padding: 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const CloseIcon = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  background-color: ${colors.background};
  border-radius: 35px;
`;

export const TextInputWithBorderBottom = styled.TextInput`
  border-bottom-width: 0.5px;
  border-color: ${colors.primary.s100};
  padding-left: 10px;
  font-size: 18px;
  opacity: 0.6;
  margin-top: 30px;
`;

export const TextAreaWithBorder = styled.TextInput`
  border-color: ${colors.primary.s100};
  background-color: ${colors.grey.s100};
  text-align-vertical: top;
  padding-left: 10px;
  margin-top: 40px;
  font-size: 18px;
  opacity: 0.6;
  height: 200px;
  border-radius: 6px;
`;

export const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;
