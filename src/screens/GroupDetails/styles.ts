import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
`;

export const Logo = styled.Image`
  width: ${width * 0.3}px;
  height: ${height * 0.3}px;
  aspect-ratio: 1;
  align-self: center;
  opacity: 0.1;
`;

export const RecordingContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: ${height * 0.1}px;
`;

export const CancelButton = styled.Image`
  margin-left: ${width * 0.03}px;
  height: ${height * 0.05}px;
  width: ${width * 0.05}px;
  aspect-ratio: 1;
`;

export const RecordingButton = styled.Image`
  height: ${height * 0.08}px;
  width: ${width * 0.08}px;
  aspect-ratio: 1;
`;

export const RecordingTitle = styled.Text`
  color: ${colors.white};
  font-size: ${RFValue(20)}px;
  align-self: center;
  margin-top: 50px;
`;

export const RecordingCount = styled.Text`
  color: ${colors.white};
  font-size: ${RFValue(65)}px;
  align-self: center;

  padding: 50px;
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
  margin-top: ${height * 0.011}px;
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
