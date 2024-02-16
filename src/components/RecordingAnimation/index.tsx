import {AnimationContainer} from './styles';
import {Animated} from 'react-native';
import React from 'react';

interface RecordingAnimationProps {
  pulseAnim: Animated.Value;
}

const RecordingAnimation = ({pulseAnim}: RecordingAnimationProps) => {
  return <AnimationContainer style={{transform: [{scale: pulseAnim}]}} />;
};

export default RecordingAnimation;
