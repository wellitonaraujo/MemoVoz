import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Platform} from 'react-native';

export const Container = styled.Pressable`
  background-color: ${colors.primary.s100};
  flex-direction: row;
  align-items: center;
  border-radius: 15px;
  height: 80px;
  padding: 10px 5px;
  width: 100%;
  ${Platform.OS === 'android'
    ? 'elevation: 5;'
    : 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.23; shadow-radius: 2.62px;'}
  margin-bottom: 20px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 17px;
  font-family: 'Poppins-Regular';
  color: ${colors.grey.s200};
`;

export const TitleCard = styled.Text`
  color: ${colors.grey.s200};
  border-radius: 3px;
`;

export const Description = styled.Text`
  font-size: 15px;
  font-family: 'Poppins-ExtraLight';
  color: ${colors.grey.s300};
`;

export const IconContainer = styled.Pressable`
  width: 40px;
  height: 40px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const ArronIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
