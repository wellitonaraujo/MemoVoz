import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {bytesToKiloBytes} from '../../../Utils/bytesToKiloBytes';
import {formatTime} from '../../../Utils/formatTime';
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

type RecordedAudioFile = {
  name: string;
  path: string;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const useRecording = (name: string) => {
  const [recordedAudioFiles, setRecordedAudioFiles] = useState<
    RecordedAudioFile[]
  >([]);
  const [tempAudioFilePath, setTempAudioFilePath] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentPlayingAudioPath, setCurrentPlayingAudioPath] =
    useState<string>('');
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Toque no botão para começar');
  const [audioFilePath, setAudioFilePath] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptionsVisible, setModalOptionVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [recordingInfo, setRecordingInfo] = useState({
    date: '',
    duration: '',
    fileSize: '',
  });

  const openOptionsModal = () => {
    setModalOptionVisible(true);
  };

  const closeOptionsModal = () => {
    setModalOptionVisible(false);
  };

  const handleSelectItem = (index: number) => {
    setSelectedIndex(index);
    openOptionsModal();
  };
  const openModal = async () => {
    setModalVisible(true);
    const date = new Date().toLocaleString('pt-BR');
    const duration = formatTime(count);

    try {
      const fileExists = await RNFS.exists(audioFilePath);
      if (fileExists) {
        const fileStat = await RNFS.stat(audioFilePath);
        const fileSize = bytesToKiloBytes(fileStat.size);
        setRecordingInfo({date, duration, fileSize});

        // Salvar informações de gravação no AsyncStorage
        await AsyncStorage.setItem(
          'recordingInfo',
          JSON.stringify({date, duration, fileSize}),
        );
      } else {
        console.log('O arquivo de áudio não existe mais');
      }
    } catch (error) {
      console.log('Erro ao obter o tamanho do arquivo:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const generateAudioFilePath = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    console.log(randomNumber);
    return `${RNFS.DocumentDirectoryPath}/recording${randomNumber}.mp3`;
  };

  const startRecording = async () => {
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
        console.log('Gravando . . . ', e);
        setIsRecording(true);
        setIsPaused(false);
        setText('Gravando...');
        setAudioFilePath(audioPath);
      });
    } catch (error) {
      console.log('Falha ao iniciar a gravação', error);
    }
  };

  const pauseRecording = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      setText('Gravação em espera...');
      console.log('Gravação em espera ');
    } catch (error) {
      console.log('Falha ao pausar a gravação...', error);
    }
  };

  const resumeRecording = async () => {
    try {
      await audioRecorderPlayer.resumeRecorder();
      setIsPaused(false);
      setText('Gravando...');
      console.log('Gravação retomada ');
    } catch (error) {
      console.log('Falha ao retomar a gravação', error);
    }
  };

  const cancelRecording = async () => {
    try {
      openModal();
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setIsPaused(false);
      setText('Toque no botão para começar');

      if (audioFilePath) {
        setTempAudioFilePath(audioFilePath);
        setCount(0);
      }

      setAudioFilePath('');
    } catch (error) {
      console.log('Falha ao cancelar a gravação', error);
    }
  };

  const addRecording = async (recordingName: string) => {
    if (recordingName && tempAudioFilePath) {
      const newAudioFile = {
        name: recordingName,
        path: tempAudioFilePath,
      };
      setRecordedAudioFiles(prevFiles => [...prevFiles, newAudioFile]);

      try {
        const groupAudioFilesJSON = await AsyncStorage.getItem(name);
        let groupAudioFiles = groupAudioFilesJSON
          ? JSON.parse(groupAudioFilesJSON)
          : [];
        groupAudioFiles.push(newAudioFile);
        await AsyncStorage.setItem(name, JSON.stringify(groupAudioFiles));
      } catch (error) {
        console.log('Erro ao salvar o novo arquivo de áudio:', error);
      }

      setTempAudioFilePath('');
      setCount(0);
      closeModal();
    }
  };

  const deleteRecording = async (index: number) => {
    const updatedAudioFiles = [...recordedAudioFiles];
    updatedAudioFiles.splice(index, 1);
    setRecordedAudioFiles(updatedAudioFiles);
    stopRecording();

    try {
      await AsyncStorage.setItem(name, JSON.stringify(updatedAudioFiles));
    } catch (error) {
      console.error(
        'Erro ao excluir o arquivo de áudio do AsyncStorage:',
        error,
      );
    }
  };

  const playRecording = async (audioPath: string) => {
    try {
      if (currentPlayingAudioPath) {
        await audioRecorderPlayer.stopPlayer();
      }
      await audioRecorderPlayer.startPlayer(audioPath);
      setCurrentPlayingAudioPath(audioPath);
      setIsAudioPlaying(true);
    } catch (error) {
      console.log('Falha ao reproduzir o áudio', error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      setCurrentPlayingAudioPath('');
      setIsAudioPlaying(false);
    } catch (error) {
      console.log('Falha ao parar o áudio', error);
    }
  };

  useEffect(() => {
    const loadRecordedAudioFiles = async () => {
      try {
        const groupAudioFilesJSON = await AsyncStorage.getItem(name);
        if (groupAudioFilesJSON) {
          const groupAudioFiles = JSON.parse(groupAudioFilesJSON);
          setRecordedAudioFiles(groupAudioFiles);
        }
      } catch (error) {
        console.error('Erro ao carregar arquivos de áudio:', error);
      }
    };

    loadRecordedAudioFiles();

    return () => {};
  }, [name]);

  const loadRecordingInfo = async () => {
    try {
      const recordingInfoJSON = await AsyncStorage.getItem('recordingInfo');
      if (recordingInfoJSON) {
        const recordingInfo = JSON.parse(recordingInfoJSON);
        setRecordingInfo(recordingInfo);
      }
    } catch (error) {
      console.log('Erro ao carregar as informações de gravação:', error);
    }
  };

  useEffect(() => {
    loadRecordingInfo();
  }, []);

  const optionsRecording = async () => {
    openOptionsModal();
  };

  return {
    recordedAudioFiles,
    tempAudioFilePath,
    isRecording,
    isPaused,
    isAudioPlaying,
    currentPlayingAudioPath,
    count,
    text,
    audioFilePath,
    recordingInfo,
    optionsRecording,
    startRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    addRecording,
    deleteRecording,
    playRecording,
    stopRecording,
    modalVisible,
    modalOptionsVisible,
    closeModal,
    closeOptionsModal,
    setCount,
    selectedIndex,
    handleSelectItem,
  };
};

export default useRecording;
