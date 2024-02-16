import {Animated, Dimensions} from 'react-native';
import styled from 'styled-components';

const {width, height} = Dimensions.get('window');

export const AnimationContainer = styled(Animated.View)`
  width: ${width * 0.3}px;
  height: ${height * 0.3}px;
  border-radius: ${width * 1}px;
  aspect-ratio: 1;
  background-color: red;
  align-self: center;
  opacity: 0.5;
`;
