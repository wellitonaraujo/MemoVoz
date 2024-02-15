import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.background};
`;

export const Logo = styled.Image`
  width: 214px;
  height: 214px;
  align-self: center;
  opacity: 0.5;
`;

export const Title = styled.Text`
  font-size: 23px;
  color: ${colors.white};
`;

export const RecordingContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin: 5%;
`;

export const CancelButton = styled.Image`
  width: 60px;
  height: 60px;
  margin: 5px;
`;

export const RecordingButton = styled.Image`
  width: 70px;
  height: 70px;
  margin: 5px;
`;

export const RecordingSection = styled.View`
  align-items: center;
`;

export const RecordingTitle = styled.Text`
  color: ${colors.white};
  font-size: 19px;
  margin: 5%;
`;

export const RecordingCount = styled.Text`
  color: ${colors.white};
  font-size: 70px;
  align-self: center;
`;
