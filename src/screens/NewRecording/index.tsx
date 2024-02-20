import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import RecordingAnimation from '../../components/RecordingAnimation';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Animated, Pressable, Text, TouchableOpacity} from 'react-native';
import SaveRecordingModal from '../../components/SaveRecordingModal';
import React, {useEffect, useRef, useState} from 'react';
import {icons} from '../../components/icons';
import RNFS from 'react-native-fs';
import {imgs} from '../imgs';

import {
  CancelButton,
  Container,
  Logo,
  RecordingButton,
  RecordingContainer,
  RecordingCount,
  RecordingTitle,
} from './styles';

const audioRecorderPlayer = new AudioRecorderPlayer();

const NewRecording = () => {
  const [pulseAnim] = useState(new Animated.Value(1));
  const [recordedAudioFiles, setRecordedAudioFiles] = useState<
    {name: string; path: string}[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempAudioFilePath, setTempAudioFilePath] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Toque no botão para começar');
  const [audioFilePath, setAudioFilePath] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [recordingInfo, setRecordingInfo] = useState({
    date: '',
    duration: '',
    fileSize: '',
  });

  const bytesToKiloBytes = (bytes: number): string => {
    return (bytes / 1024).toFixed(2) + ' kB';
  };

  // Função para abrir o modal
  const openModal = async () => {
    setModalVisible(true);
    const date = new Date().toLocaleString('pt-BR');
    const duration = formatTime(count);

    try {
      const fileStat = await RNFS.stat(audioFilePath);
      const fileSize = bytesToKiloBytes(fileStat.size);
      setRecordingInfo({date, duration, fileSize});
    } catch (error) {
      console.error('Erro ao obter o tamanho do arquivo:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    const stopAnimation = () => {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    };

    if (isRecording && !isPaused) {
      startAnimation();
      timerRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    } else {
      if (!isPaused) {
        stopAnimation();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      stopAnimation();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused, pulseAnim]);

  const generateAudioFilePath = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // Gera um número aleatório entre 1 e 1000
    console.log(randomNumber);
    return `${RNFS.DownloadDirectoryPath}/recording${randomNumber}.mp3`;
  };

  const startRecording = async () => {
    try {
      // Verificar permissão de gravação de áudio
      const recordAudioPermission = await check(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      console.log('Permissão de gravação de áudio FOI concedida');
      // Verificar se a permissão de gravação de áudio foi concedida
      if (recordAudioPermission !== RESULTS.GRANTED) {
        // Se não foi concedida, solicitar permissão ao usuário
        const permissionResult = await request(
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        );

        // Verificar se o usuário concedeu a permissão
        if (permissionResult !== RESULTS.GRANTED) {
          console.log('Permissão de gravação de áudio não concedida');
          return;
        }
      }

      // Se a permissão foi concedida, iniciar a gravação
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
      console.error('Falha ao iniciar a gravação', error);
    }
  };

  const pauseRecording = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      setText('Gravação pausada');
      console.log('Gravação pausada ');
    } catch (error) {
      console.error('Falha ao pausar a gravação', error);
    }
  };

  const resumeRecording = async () => {
    try {
      await audioRecorderPlayer.resumeRecorder();
      setIsPaused(false);
      setText('Gravando...');
      console.log('Gravação retomada ');
    } catch (error) {
      console.error('Falha ao retomar a gravação', error);
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
      console.error('Falha ao cancelar a gravação', error);
    }
  };

  const addRecording = (name: string) => {
    if (name && tempAudioFilePath) {
      const newAudioFile = {
        name,
        path: tempAudioFilePath,
      };
      setRecordedAudioFiles(prevFiles => [...prevFiles, newAudioFile]);
      setTempAudioFilePath('');
      setCount(0);
      closeModal();
    }
  };

  const playRecording = async (audioPath: string) => {
    try {
      await audioRecorderPlayer.startPlayer(audioPath);
    } catch (error) {
      console.error('Falha ao reproduzir o áudio', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return (
    <Container>
      <RecordingCount>{formatTime(count)}</RecordingCount>
      {isRecording && !isPaused ? (
        <RecordingAnimation pulseAnim={pulseAnim} />
      ) : (
        <Logo source={imgs.logo} />
      )}
      <RecordingTitle>{text}</RecordingTitle>
      <RecordingContainer>
        {isRecording && !isPaused ? (
          <>
            <TouchableOpacity onPress={pauseRecording}>
              <RecordingButton source={icons.pauseicon} />
            </TouchableOpacity>
            <Pressable onPress={cancelRecording}>
              <CancelButton source={icons.cancelicon} />
            </Pressable>
          </>
        ) : isPaused ? (
          <>
            <TouchableOpacity onPress={resumeRecording}>
              <RecordingButton source={icons.playicon} />
            </TouchableOpacity>
            <Pressable onPress={cancelRecording}>
              <CancelButton source={icons.cancelicon} />
            </Pressable>
          </>
        ) : (
          <TouchableOpacity onPress={startRecording}>
            <RecordingButton source={icons.recordingicon} />
          </TouchableOpacity>
        )}
      </RecordingContainer>
      <SaveRecordingModal
        visible={modalVisible}
        onClose={closeModal}
        addRecording={addRecording}
        recordingInfo={recordingInfo}
      />
      {recordedAudioFiles.map((audio, index) => (
        <Pressable key={index} onPress={() => playRecording(audio.path)}>
          <Text>{audio.name}</Text>
        </Pressable>
      ))}
    </Container>
  );
};

export default NewRecording;
