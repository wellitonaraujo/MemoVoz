//recordingRecucer.ts

import {combineReducers} from 'redux';
import {
  RecordingActionTypes,
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
} from '../actions/recordingActions';
import {RecordedAudioFile} from '../types';

export interface RecordingState {
  recordedAudioFiles: RecordedAudioFile[];
  tempAudioFilePath: string;
  isRecording: boolean;
  isPaused: boolean;
  isAudioPlaying: boolean;
  currentPlayingAudioPath: string;
  count: number;
  text: string;
  audioFilePath: string;
  modalVisible: boolean;
  modalOptionsVisible: boolean;
  selectedIndex: number;
  recordingInfo: {
    date: string;
    duration: string;
    fileSize: string;
  };
}

const initialState: RecordingState = {
  recordedAudioFiles: [],
  tempAudioFilePath: '',
  isRecording: false,
  isPaused: false,
  isAudioPlaying: false,
  currentPlayingAudioPath: '',
  count: 0,
  text: 'Toque no botão para começar',
  audioFilePath: '',
  modalVisible: false,
  modalOptionsVisible: false,
  selectedIndex: 0,
  recordingInfo: {
    date: '',
    duration: '',
    fileSize: '',
  },
};

const recordingReducer = (
  state = initialState,
  action: RecordingActionTypes,
): RecordingState => {
  switch (action.type) {
    case START_RECORDING:
      return {...state, isRecording: true};

    case PAUSE_RECORDING:
      return {...state, isPaused: true, text: 'Gravação em espera...'};

    case RESUME_RECORDING:
      return {
        ...state,
        isPaused: false,
        isRecording: true,
        text: 'Gravando...',
      };

    case CANCEL_RECORDING:
      return {
        ...state,
        modalVisible: true,
        isRecording: false,
        isPaused: false,
        text: 'Toque no botão para começar',
        audioFilePath: '',
        recordingInfo: action.payload
          ? {
              date: action.payload.date,
              duration: action.payload.duration,
              fileSize: action.payload.fileSize,
            }
          : {
              date: '',
              duration: '',
              fileSize: '',
            },
      };

    case ADD_RECORDING:
      return {
        ...state,
        recordedAudioFiles: [...state.recordedAudioFiles, action.payload],
        tempAudioFilePath: '',
        count: 0,
        modalVisible: false,
      };

    case DELETE_RECORDING:
      return {
        ...state,
        recordedAudioFiles: state.recordedAudioFiles.filter(
          (_, index) => index !== action.payload,
        ),
      };

    case PLAY_RECORDING:
      return {
        ...state,
        currentPlayingAudioPath: action.payload,
        isAudioPlaying: true,
      };

    case STOP_RECORDING:
      return {
        ...state,
        currentPlayingAudioPath: '',
        isAudioPlaying: false,
      };

    case SET_COUNT:
      return {...state, count: action.payload};

    case OPEN_MODAL:
      return {...state, modalVisible: true};

    case CLOSE_MODAL:
      return {...state, modalVisible: false};

    case OPEN_OPTIONS_MODAL:
      return {...state, modalOptionsVisible: true};

    case CLOSE_OPTIONS_MODAL:
      return {...state, modalOptionsVisible: false};

    case SET_SELECTED_INDEX:
      return {...state, selectedIndex: action.payload};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  recording: recordingReducer,
});

export default recordingReducer;

export type RootState = ReturnType<typeof rootReducer>;
