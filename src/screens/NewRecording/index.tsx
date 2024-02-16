import {
  Animated,
  PermissionsAndroid,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import RecordingAnimation from '../../components/RecordingAnimation';
import {icons} from '../../components/icons';
import {imgs} from '../imgs';
import React, {useEffect, useState} from 'react';
import {
  RecordingContainer,
  RecordingButton,
  RecordingCount,
  RecordingTitle,
  CancelButton,
  Container,
  Logo,
} from './styles';
import useRecording from './hook/useRecording';

const NewRecording = () => {
  const [pulseAnim] = useState(new Animated.Value(1));

  const handlePermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('Gravar armazenamento externo', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  useEffect(() => {
    handlePermissions();
  }, []);

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
  } = useRecording();

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
    </Container>
  );
};

export default NewRecording;
