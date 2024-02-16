import RecordingAnimation from '../../components/RecordingAnimation';
import {Pressable, TouchableOpacity} from 'react-native';
import useRecording from './hook/useRecording';
import {icons} from '../../components/icons';
import {imgs} from '../imgs';
import React from 'react';
import {
  RecordingContainer,
  RecordingButton,
  RecordingCount,
  RecordingTitle,
  CancelButton,
  Container,
  Logo,
} from './styles';

const NewRecording = () => {
  const {
    isRecording,
    isPaused,
    count,
    text,
    startRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    formatTime,
    pulseAnim,
  } = useRecording();

  return (
    <Container>
      <>
        <RecordingCount>{formatTime(count)}</RecordingCount>

        {isRecording && <RecordingAnimation pulseAnim={pulseAnim} />}
        <Logo source={imgs.logo} />
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
      </>
    </Container>
  );
};

export default NewRecording;
