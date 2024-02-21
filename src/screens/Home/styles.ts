import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
`;

export const ButtonContainer = styled.View`
  bottom: ${height * 0.03}px;
  right: ${width * 0.05}px;
  position: absolute;
`;
export const ListGroupTitle = styled.Text`
  font-size: ${RFValue(22)}px;
  color: ${colors.white};
  padding: 20px 0 20px 0;
`;

export const Logo = styled.Image`
  width: ${width * 0.3}px;
  height: ${height * 0.3}px;
  aspect-ratio: 1;
  align-self: center;
  margin-top: ${height * 0.25}px;
  position: relative;
  opacity: 0.1;
`;

export const AudioPlayer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${width * 0.4}px;
  height: ${height * 0.1}px;
  color: ${colors.primary.s100};
  width: 100%;
  border-bottom-width: 0.4px;
  border-bottom-color: ${colors.inputBorder.s100}; /* Cor da linha */
`;

export const AudioName = styled.Text`
  flex: 1;
  color: ${colors.white};
  font-size: 20px;
  margin-left: 20px;
`;

export const Play = styled.Image`
  width: ${width * 0.05}px;
  height: ${height * 0.05}px;
  aspect-ratio: 1;
`;
