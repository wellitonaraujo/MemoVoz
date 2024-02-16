import {Animated} from 'react-native';

interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  count: number;
  text: string;
}

export interface UseRecordingReturnType extends RecordingState {
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  cancelRecording: () => void;
  formatTime: (seconds: number) => string;
  pulseAnim: Animated.Value;
}
