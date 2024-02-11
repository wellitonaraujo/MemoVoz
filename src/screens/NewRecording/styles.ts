import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.background};
  padding: 16px;
`;

export const Logo = styled.Image`
  width: 214px;
  height: 214px;
  align-self: center;
`;

export const RecordingContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const CancelButton = styled.Image`
  width: 40px;
  height: 40px;
`;

export const RecordingButton = styled.Image`
  width: 50px;
  height: 50px;
  margin: 10px;
`;

export const RecordingSection = styled.View`
  position: absolute;
  bottom: 0;
  align-items: center;
  padding: 50px;
`;

export const RecordingTitle = styled.Text`
  color: ${colors.white};
  margin-top: 20px;
`;

export const RecordingCount = styled.Text`
  color: ${colors.white};
  font-size: 70px;
  margin-top: 20px;
  align-self: center;
`;
