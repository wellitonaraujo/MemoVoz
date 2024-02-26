import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers/recordingReducer';
import {
  RecordingActionTypes,
  START_RECORDING,
  PAUSE_RECORDING,
  RESUME_RECORDING,
  CANCEL_RECORDING,
  DELETE_RECORDING,
} from '../actions/recordingActions';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {generateAudioFilePath} from '../../Utils/generateAudioFilePath';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addRecording} from '.';

const audioRecorderPlayer = new AudioRecorderPlayer();

// Ações assíncronas (Thunk Actions)
export const startRecordingAsync =
  (): ThunkAction<void, RootState, unknown, RecordingActionTypes> =>
  async dispatch => {
    try {
      const recordAudioPermission = await check(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );

      if (recordAudioPermission !== RESULTS.GRANTED) {
        const permissionResult = await request(
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        );
        if (permissionResult !== RESULTS.GRANTED) {
          console.log('Permissão de gravação de áudio não concedida');
          return;
        }
      }

      const audioPath = generateAudioFilePath();
      await audioRecorderPlayer.startRecorder(audioPath);

      audioRecorderPlayer.addRecordBackListener(e => {
        console.log('Gravando...', e);
        dispatch({type: START_RECORDING});
      });
    } catch (error) {
      console.log('Falha ao iniciar a gravação', error);
    }
  };

export const pauseRecordingAsync =
  (): ThunkAction<void, RootState, unknown, RecordingActionTypes> =>
  async (dispatch, getState) => {
    try {
      const {isRecording} = getState().recording;

      if (isRecording) {
        await audioRecorderPlayer.pauseRecorder();
        console.log('Gravacão em espera...');
        audioRecorderPlayer.removeRecordBackListener();
        dispatch({type: PAUSE_RECORDING});
      }
    } catch (error) {
      console.error('Erro ao pausar a gravação:', error);
    }
  };

export const resumeRecordingAsync =
  (): ThunkAction<void, RootState, unknown, RecordingActionTypes> =>
  async (dispatch, getState) => {
    try {
      const {isPaused} = getState().recording;
      console.log(isPaused);

      // Verifica se a gravação estava pausada antes de retomar
      if (isPaused) {
        // Retoma a gravação de áudio
        console.log('Caiu aqui...');
        await audioRecorderPlayer.resumeRecorder();
        console.log('Retomando a gravação:');
        // Dispara a ação para atualizar o estado da aplicação
        dispatch({type: RESUME_RECORDING});
      }
    } catch (error) {
      console.error('Erro ao retomar a gravação:', error);
    }
  };

export const cancelRecordingAsync =
  (): ThunkAction<void, RootState, unknown, RecordingActionTypes> =>
  async (dispatch, getState) => {
    try {
      const {isRecording} = getState().recording;

      // Verifica se está gravando antes de cancelar
      if (isRecording) {
        // Cancela a gravação de áudio
        await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        console.log('Gravação cancelada...');
        // Dispara a ação para atualizar o estado da aplicação
        dispatch({type: CANCEL_RECORDING});
      }
    } catch (error) {
      console.error('Erro ao cancelar a gravação:', error);
    }
  };

export const addRecordingAsync =
  (
    recordingName: string,
  ): ThunkAction<void, RootState, unknown, RecordingActionTypes> =>
  async (dispatch, getState) => {
    try {
      const {tempAudioFilePath} = getState().recording;

      if (recordingName && tempAudioFilePath) {
        const newAudioFile = {
          name: recordingName,
          path: tempAudioFilePath,
        };

        // Atualiza a lista de arquivos de áudio gravados no estado
        dispatch(addRecording(newAudioFile)); // Correção aqui

        // Obtém o nome do grupo para salvar o arquivo de áudio no AsyncStorage
        const {name} = getState().groupDetails.route.params;

        // Salva o novo arquivo de áudio no AsyncStorage
        const groupAudioFilesJSON = await AsyncStorage.getItem(name);
        let groupAudioFiles = groupAudioFilesJSON
          ? JSON.parse(groupAudioFilesJSON)
          : [];
        groupAudioFiles.push(newAudioFile);
        await AsyncStorage.setItem(name, JSON.stringify(groupAudioFiles));

        // Limpa o caminho temporário do arquivo de áudio e reseta o contador
        dispatch(setTempAudioFilePath(''));
        dispatch(setCount(0));

        // Fecha o modal de salvamento
        dispatch(closeModal());
      }
    } catch (error) {
      console.log('Erro ao adicionar a gravação:', error);
    }
  };

export const deleteRecordingAsync =
  (
    index: number,
  ): ThunkAction<void, RootState, unknown, RecordingActionTypes> =>
  async dispatch => {
    try {
      // Dispara a ação DELETE_RECORDING com o índice da gravação a ser removida como payload
      dispatch({type: DELETE_RECORDING, payload: index});
    } catch (error) {
      console.error('Erro ao deletar a gravação:', error);
    }
  };
