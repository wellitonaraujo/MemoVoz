import {Dimensions, Image, Platform} from 'react-native';
import styled from 'styled-components/native';

interface CreateGroupProps {
  backgroundColor?: string;
}

const screenHeight = Dimensions.get('window').height;
const buttonSize = screenHeight * 0.07;
const marginTop = screenHeight * 0.03;
const iconSize = buttonSize * 0.6;

export const CreateGroup = styled.TouchableOpacity<CreateGroupProps>`
  width: ${buttonSize}px;
  height: ${buttonSize}px;
  background-color: ${props => props.backgroundColor};
  border-radius: ${buttonSize}px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-top: ${marginTop}px;
  ${Platform.OS === 'android'
    ? 'elevation: 5;'
    : 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.23; shadow-radius: 2.62px;'}
`;

export const Icon = styled(Image)`
  width: ${iconSize}px;
  height: ${iconSize}px;
`;
