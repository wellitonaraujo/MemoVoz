import React, {useState} from 'react';
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
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {icons} from '../../components/icons';

const NewRecording = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>(
    'Toque no botão abaixo para começar',
  );

  const startRecording = () => {
    setIsRecording(true);
    setText('Gravando...');
  };

  const pauseRecording = () => {
    setIsRecording(false);
    setText('Toque no botão abaixo para começar');
  };

  const resumeRecording = () => {
    setIsRecording(true);
    setText('Gravando...');
  };

  return (
    <Container>
      <Logo source={imgs.logo} />

      <RecordingSection>
        <RecordingTitle>{text}</RecordingTitle>

        <RecordingCount>00:06</RecordingCount>

        <RecordingContainer>
          {isRecording ? (
            <>
              <TouchableOpacity onPress={pauseRecording}>
                <RecordingButton source={icons.pauseicon} />
              </TouchableOpacity>
              <Pressable onPress={pauseRecording}>
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
