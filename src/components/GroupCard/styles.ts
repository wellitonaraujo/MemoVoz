import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Platform} from 'react-native';

export const Container = styled.Pressable`
  background-color: ${colors.grey.s400};
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  width: 100%;
  ${Platform.OS === 'android'
    ? 'elevation: 5;'
    : 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.23; shadow-radius: 2.62px;'}
  margin-bottom: 20px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 17px;
  font-family: 'Poppins-Regular';
  color: ${colors.grey.s200};
`;

export const TitleCard = styled.Text`
  color: ${colors.grey.s200};
  border-radius: 3px;
  padding: 0 20px;
`;

export const Description = styled.Text`
  font-size: 15px;
  font-family: 'Poppins-ExtraLight';
  color: ${colors.grey.s300};
  padding: 10px 20px;
`;

export const IconContainer = styled.View`
  margin-left: 10px;
`;

export const ArronIcon = styled.Image`
  width: 25px;
  height: 25px;
`;
