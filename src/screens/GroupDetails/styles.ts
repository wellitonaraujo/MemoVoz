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
  font-size: ${RFValue(25)}px;
  color: ${colors.white};
  padding: 20px 0 20px 0;
`;

export const Title = styled.Text`
  font-size: ${RFValue(22)}px;
  font-family: 'Poppins-Regular';
  color: ${colors.grey.s200};
  align-self: center;
  padding-top: 30px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: 'Poppins-ExtraLight';
  color: ${colors.grey.s300};
  padding-top: 30px;
  margin-bottom: 20px;
  align-self: center;
`;

export const EditIcon = styled.Image`
  width: 30px;
  height: 30px;
`;
