// types.ts

export interface RecordedAudioFile {
  name: string;
  path: string;
}

export interface RecordingState {
  recordedAudioFiles: RecordedAudioFile[];
  isRecording: boolean;
  isPaused: boolean;
}

export interface RootState {
  recording: RecordingState;
}
