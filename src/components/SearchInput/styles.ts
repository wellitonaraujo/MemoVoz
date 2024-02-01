import {TextInput} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions, Image} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const Container = styled.View`
  background-color: ${colors.primary.s100};
  margin-top: ${screenHeight * 0.02}px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  font-size: 30px;
  padding: 0 10px;
  width: 100%;
`;

export const StyledInput = styled(TextInput)`
  font-family: 'Poppins-ExtraLight';
  font-size: 16px;
  height: 50px;
  flex: 1;
`;

export const PlaceholderText = styled.Text`
  position: absolute;
  left: 12px;
  top: 10px;
`;

export const SearchIcon = styled(Image)`
  margin-right: 10px;
  height: 24px;
  width: 24px;
`;
