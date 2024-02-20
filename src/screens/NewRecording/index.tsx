import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import RecordingAnimation from '../../components/RecordingAnimation';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {Animated, Pressable, Text, TouchableOpacity} from 'react-native';
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
  const [cancelledAudioFilePath, setCancelledAudioFilePath] = useState<
    string | null
  >(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Toque no botão para começar');
  const [audioFilePath, setAudioFilePath] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
      // Lógica para cancelar a gravação...
      const cancelledPath = generateAudioFilePath();
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setIsPaused(false);
      setText('Toque no botão para começar');
      setCancelledAudioFilePath(cancelledPath);
      setCount(0);
      console.log('Gravação cancelada. ');
    } catch (error) {
      console.error('Falha ao cancelar a gravação', error);
    }
  };

  const playRecording = async () => {
    try {
      if (audioFilePath) {
        await audioRecorderPlayer.startPlayer(audioFilePath);
      } else {
        console.warn('Nenhuma gravação disponível para ouvir');
      }
    } catch (error) {
      console.error('Falha ao reproduzir a gravação', error);
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
      <Pressable
        onPress={playRecording}
        style={{width: 100, height: 30, backgroundColor: 'white'}}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Play
        </Text>
      </Pressable>
    </Container>
  );
};

export default NewRecording;
