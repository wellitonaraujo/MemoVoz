import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${colors.primary.s200};
  padding: 16px;
`;

export const Logo = styled.Image`
  width: 214px;
  height: 214px;
  align-self: center;
`;
