import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions, Image, Platform} from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const Container = styled.Pressable`
  background-color: ${colors.primary.s100};
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  ${Platform.OS === 'android'
    ? 'elevation: 5;'
    : 'shadow-color: #000; shadow-offset: 0px 2px; shadow-opacity: 0.23; shadow-radius: 2.62px;'}
  margin-bottom: 20px;
`;

export const InfoContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Title = styled.Text`
  font-size: 19px;
  font-family: 'Poppins-Regular';
  color: ${colors.grey.s200};
`;

export const TitleCard = styled.Text`
  background-color: ${colors.primary.s200};
  color: ${colors.grey.s200};
  border-radius: 6px;
  padding: 5px 20px;
`;

export const Description = styled.Text`
  font-size: 17px;
  font-family: 'Poppins-ExtraLight';
  color: ${colors.grey.s300};
  padding: 5px 0;
`;
