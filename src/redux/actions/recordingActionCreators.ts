// recordingActionCreators.ts
import {RecordedAudioFile} from '../types';
import {
  SET_MODAL_VISIBLE,
  SET_MODAL_OPTION_VISIBLE,
  SET_RECORDING_INFO,
  START_RECORDING,
  PAUSE_RECORDING,
  RESUME_RECORDING,
  CANCEL_RECORDING,
  ADD_RECORDING,
  DELETE_RECORDING,
  PLAY_RECORDING,
  STOP_RECORDING,
  SET_COUNT,
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_OPTIONS_MODAL,
  CLOSE_OPTIONS_MODAL,
  SET_SELECTED_INDEX,
} from './recordingActions';

// Definição das ações síncronas
export const setModalVisible = (isVisible: boolean) => ({
  type: SET_MODAL_VISIBLE,
  payload: isVisible,
});

export const setModalOptionVisible = (isVisible: boolean) => ({
  type: SET_MODAL_OPTION_VISIBLE,
  payload: isVisible,
});

export const setRecordingInfo = (info: {
  date: string;
  duration: string;
  fileSize: string;
}) => ({
  type: SET_RECORDING_INFO,
  payload: info,
});

export const startRecording = () => ({
  type: START_RECORDING,
});

export const pauseRecording = () => ({
  type: PAUSE_RECORDING,
});

export const resumeRecording = () => ({
  type: RESUME_RECORDING,
});

export const cancelRecording = () => ({
  type: CANCEL_RECORDING,
});

export const addRecording = (audioFile: RecordedAudioFile) => ({
  type: ADD_RECORDING,
  payload: audioFile,
});

export const deleteRecording = (index: number) => ({
  type: DELETE_RECORDING,
  payload: index,
});

export const playRecording = (audioPath: string) => ({
  type: PLAY_RECORDING,
  payload: audioPath,
});

export const stopRecording = () => ({
  type: STOP_RECORDING,
});

export const setCount = (count: number) => ({
  type: SET_COUNT,
  payload: count,
});

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const openOptionsModal = () => ({
  type: OPEN_OPTIONS_MODAL,
});

export const closeOptionsModal = () => ({
  type: CLOSE_OPTIONS_MODAL,
});

export const setSelectedIndex = (index: number) => ({
  type: SET_SELECTED_INDEX,
  payload: index,
});
