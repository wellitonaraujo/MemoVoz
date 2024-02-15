import {TextInput} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions, Image} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const Container = styled.View`
  background-color: ${colors.inputBorder.s100};
  margin-top: ${screenHeight * 0.02}px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  font-size: 30px;
  padding: 0 8px;
  width: 100%;
  margin-bottom: 30px;
  opacity: 0.5;
`;

export const StyledInput = styled(TextInput)`
  font-size: 16px;
  height: 48px;
  flex: 1;
`;

export const PlaceholderText = styled.Text`
  position: absolute;
  left: 12px;
  top: 10px;
`;

export const SearchIcon = styled(Image)`
  margin: 5px 5px;
  height: 20px;
  width: 20px;
`;
