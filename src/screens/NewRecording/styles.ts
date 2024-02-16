import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.background};
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
  padding-bottom: ${height * 0.04}px;
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

export const RecordingSection = styled.View`
  align-items: center;
`;

export const RecordingTitle = styled.Text`
  color: ${colors.white};
  font-size: ${RFValue(20)}px;
`;

export const RecordingCount = styled.Text`
  color: ${colors.white};
  font-size: ${RFValue(70)}px;
  align-self: center;
  padding-top: 10%;
`;
