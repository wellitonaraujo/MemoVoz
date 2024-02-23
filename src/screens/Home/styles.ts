import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Animated, Dimensions} from 'react-native';

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

export const Logo = styled(Animated.Image)`
  width: ${width * 0.3}px;
  height: ${height * 0.3}px;
  aspect-ratio: 1;
  align-self: center;
  margin-top: ${height * 0.25}px;
  position: relative;
  opacity: 0.3;
`;
