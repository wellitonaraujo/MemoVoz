// cordignActions.ts
import {RecordedAudioFile} from '../types';

// Tipos de ações
export const START_RECORDING = 'START_RECORDING';
export const PAUSE_RECORDING = 'PAUSE_RECORDING';
export const RESUME_RECORDING = 'RESUME_RECORDING';
export const CANCEL_RECORDING = 'CANCEL_RECORDING';
export const ADD_RECORDING = 'ADD_RECORDING';
export const DELETE_RECORDING = 'DELETE_RECORDING';
export const PLAY_RECORDING = 'PLAY_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const SET_COUNT = 'SET_COUNT';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_OPTIONS_MODAL = 'OPEN_OPTIONS_MODAL';
export const CLOSE_OPTIONS_MODAL = 'CLOSE_OPTIONS_MODAL';
export const SET_SELECTED_INDEX = 'SET_SELECTED_INDEX';
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
export const SET_MODAL_OPTION_VISIBLE = 'SET_MODAL_OPTION_VISIBLE';
export const SET_RECORDING_INFO = 'SET_RECORDING_INFO';

// Interfaces de ações
export interface StartRecordingAction {
  type: typeof START_RECORDING;
}

export interface PauseRecordingAction {
  type: typeof PAUSE_RECORDING;
}

export interface ResumeRecordingAction {
  type: typeof RESUME_RECORDING;
}

interface CancelRecordingAction {
  type: typeof CANCEL_RECORDING;
  payload: {
    date: string;
    duration: string;
    fileSize: string;
  };
}

export interface AddRecordingAction {
  type: typeof ADD_RECORDING;
  payload: RecordedAudioFile;
}

export interface DeleteRecordingAction {
  type: typeof DELETE_RECORDING;
  payload: number;
}

export interface PlayRecordingAction {
  type: typeof PLAY_RECORDING;
  payload: string;
}

export interface StopRecordingAction {
  type: typeof STOP_RECORDING;
}

export interface SetCountAction {
  type: typeof SET_COUNT;
  payload: number;
}

export interface OpenModalAction {
  type: typeof OPEN_MODAL;
}

export interface CloseModalAction {
  type: typeof CLOSE_MODAL;
}

export interface OpenOptionsModalAction {
  type: typeof OPEN_OPTIONS_MODAL;
}

export interface CloseOptionsModalAction {
  type: typeof CLOSE_OPTIONS_MODAL;
}

export interface SetSelectedIndexAction {
  type: typeof SET_SELECTED_INDEX;
  payload: number;
}

export interface SetModalVisibleAction {
  type: typeof SET_MODAL_VISIBLE;
  payload: boolean;
}

export interface SetModalOptionVisibleAction {
  type: typeof SET_MODAL_OPTION_VISIBLE;
  payload: boolean;
}

export interface SetRecordingInfoAction {
  type: typeof SET_RECORDING_INFO;
  payload: {
    date: string;
    duration: string;
    fileSize: string;
  };
}

// Tipos de ações combinados
export type RecordingActionTypes =
  | StartRecordingAction
  | PauseRecordingAction
  | ResumeRecordingAction
  | CancelRecordingAction
  | AddRecordingAction
  | DeleteRecordingAction
  | PlayRecordingAction
  | StopRecordingAction
  | SetCountAction
  | OpenModalAction
  | CloseModalAction
  | OpenOptionsModalAction
  | CloseOptionsModalAction
  | SetSelectedIndexAction
  | SetModalVisibleAction
  | SetModalOptionVisibleAction
  | SetRecordingInfoAction;
