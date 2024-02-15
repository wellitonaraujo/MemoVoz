import React, {useEffect, useState} from 'react';
import {imgs} from '../imgs';
import {
  CancelButton,
  Container,
  Logo,
  RecordingButton,
  RecordingContainer,
  RecordingCount,
  RecordingSection,
  RecordingTitle,
} from './styles';
import {Pressable, TouchableOpacity} from 'react-native';
import {icons} from '../../components/icons';

const NewRecording = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>(
    'Toque no botão abaixo para começar',
  );

  useEffect(() => {
    let timer: any;
    if (isRecording && !isPaused) {
      timer = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  const startRecording = () => {
    setIsRecording(true);
    setText('Gravando...');
    setCount(0);
  };

  const pauseRecording = () => {
    setIsPaused(true);
    setText('Gravação pausada');
  };

  const resumeRecording = () => {
    setIsPaused(false);
    setText('Gravando...');
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setText('Toque no botão abaixo para começar');
    setCount(0);
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
      <Logo source={imgs.logo} />

      <RecordingSection>
        <RecordingTitle>{text}</RecordingTitle>

        <RecordingCount>{formatTime(count)}</RecordingCount>

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
      </RecordingSection>
    </Container>
  );
};

export default NewRecording;
