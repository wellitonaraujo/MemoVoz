import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {bytesToKiloBytes} from '../../../Utils/bytesToKiloBytes';
import {formatTime} from '../../../Utils/formatTime';
import {useState, useEffect} from 'react';
import Sound from 'react-native-sound';
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
    const selectedAudio = recordedAudioFiles[index];
    setSelectedIndex(index);
    // Extrai o nome do arquivo de áudio do caminho
    const audioFileName = selectedAudio.path.split('/').pop();
    loadRecordingInfo(audioFileName);
    openOptionsModal();
  };

  const saveRecordingModal = async () => {
    setModalVisible(true);
    const date = new Date().toLocaleString('pt-BR');
    const duration = formatTime(count);

    try {
      const fileExists = await RNFS.exists(audioFilePath);
      if (fileExists) {
        const fileStat = await RNFS.stat(audioFilePath);
        const fileSize = bytesToKiloBytes(fileStat.size);
        setRecordingInfo({date, duration, fileSize});

        // Salvar informações de gravação no AsyncStorage usando o nome do arquivo como chave
        const audioFileName = audioFilePath.split('/').pop(); // Extrai o nome do arquivo do caminho
        await AsyncStorage.setItem(
          `recordingInfo_${audioFileName}`,
          JSON.stringify({date, duration, fileSize}),
        );
      } else {
        console.log('O arquivo de áudio não existe mais');
      }
    } catch (error) {
      console.log('Erro ao obter o tamanho do arquivo:', error);
    }
  };

  const loadRecordingInfo = async (audioFileName: string) => {
    try {
      const recordingInfoJSON = await AsyncStorage.getItem(
        `recordingInfo_${audioFileName}`,
      );
      if (recordingInfoJSON) {
        const recordingInfo = JSON.parse(recordingInfoJSON);
        setRecordingInfo(recordingInfo);
        console.log(recordingInfo);
      }
    } catch (error) {
      console.log('Erro ao carregar as informações de gravação:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const generateAudioFilePath = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return `${RNFS.DocumentDirectoryPath}/recording${randomNumber}.mp3`;
  };

  const startRecorder = async () => {
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

      // Verifica se uma gravação está sendo reproduzida atualmente
      if (isAudioPlaying) {
        // Se sim, interrompe a reprodução atual antes de iniciar uma nova gravação
        await stopPlayer();
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

  const pauseRecorder = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      setText('Gravação em espera...');
      console.log('Gravação em espera ');
    } catch (error) {
      console.log('Falha ao pausar a gravação...', error);
    }
  };

  const resumeRecorder = async () => {
    try {
      await audioRecorderPlayer.resumeRecorder();
      setIsPaused(false);
      setText('Gravando...');
      console.log('Gravação retomada ');
    } catch (error) {
      console.log('Falha ao retomar a gravação', error);
    }
  };

  const stopRecorder = async () => {
    try {
      saveRecordingModal();
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
    recordingStop();

    try {
      await AsyncStorage.setItem(name, JSON.stringify(updatedAudioFiles));
    } catch (error) {
      console.error(
        'Erro ao excluir o arquivo de áudio do AsyncStorage:',
        error,
      );
    }
  };

  const getAudioDuration = async (audioPath: string) => {
    try {
      return new Promise<number>((resolve, reject) => {
        const sound = new Sound(audioPath, '', error => {
          if (error) {
            console.log('Erro ao carregar o áudio:', error);
            reject(error);
            return;
          }

          // Obtém a duração do áudio em segundos
          const audioDuration = sound.getDuration();
          resolve(audioDuration);
        });
      });
    } catch (error) {
      console.log('Erro ao obter a duração do áudio:', error);
      return null;
    }
  };

  // players

  const startPlayer = async (audioPath: string) => {
    try {
      const duration = await getAudioDuration(audioPath);
      if (duration !== null) {
        console.log('Duração do áudio:', duration);
        // Verifica se há um áudio tocando atualmente
        if (isAudioPlaying && currentPlayingAudioPath !== audioPath) {
          // Se sim, para o áudio atual antes de iniciar um novo
          await stopPlayer();
        }
        // Inicia a reprodução do novo áudio
        await audioRecorderPlayer.startPlayer(audioPath);
        setCurrentPlayingAudioPath(audioPath);
        setIsAudioPlaying(true);

        setTimeout(async () => {
          await stopPlayer();
        }, duration * 1000);
      }
    } catch (error) {
      console.log('Falha ao reproduzir o áudio', error);
    }
  };

  const pausePlayer = async () => {
    try {
      if (isAudioPlaying) {
        await audioRecorderPlayer.pausePlayer();
        setIsAudioPlaying(false);
      }
    } catch (error) {
      console.log('Falha ao pausar a reprodução', error);
    }
  };

  const resumePlayer = async () => {
    try {
      if (!isAudioPlaying) {
        await audioRecorderPlayer.resumePlayer();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.log('Falha ao retomar a reprodução', error);
    }
  };

  const stopPlayer = async () => {
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
    startRecorder,
    pauseRecorder,
    resumeRecorder,
    stopRecorder,
    addRecording,
    deleteRecording,
    startPlayer,
    stopPlayer,
    modalVisible,
    modalOptionsVisible,
    closeModal,
    closeOptionsModal,
    setCount,
    selectedIndex,
    handleSelectItem,
    resumePlayer,
    pausePlayer,
  };
};

export default useRecording;
