// GroupDetails.tsx
import React, {useEffect, useRef, useState} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {icons} from '../../components/icons';
import {Animated, BackHandler, Pressable} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {
  CancelButton,
  Logo,
  RecordingButton,
  RecordingContainer,
  RecordingCount,
  RecordingTitle,
  Container,
  Description,
  Title,
  AudioName,
  AudioPlayer,
  ButtonContainer,
  Play,
  Trash,
} from './styles';
import RecordingAnimation from '../../components/RecordingAnimation';
import {imgs} from '../imgs';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import SaveRecordingModal from '../../components/SaveRecordingModal';
import InitialButton from '../../components/InitialButton';
import colors from '../../styles/colors';

import {formatTime} from '../../Utils/formatTime';
import {bytesToKiloBytes} from '../../Utils/bytesToKiloBytes';
import useRecording from './hook/useRecording';

type RootStackParamList = {
  Home: undefined;
  NewRecording: undefined;
  GroupDetails: {name: string; description: string};
};

type GroupDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GroupDetails'
>;

interface Props {
  navigation: GroupDetailsScreenNavigationProp;
}

interface GroupDetailsProps {
  route: {params: {groupId: string; name: string; description: string}};
}

const GroupDetails: React.FC<GroupDetailsProps> = ({route}) => {
  const {name, description} = route.params;

  const {
    recordedAudioFiles,
    isRecording,
    isPaused,
    count,
    startRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    addRecording,
    deleteRecording,
    playRecording,
    stopRecording,
    modalVisible,
    currentPlayingAudioPath,
    isAudioPlaying,
    closeModal,
    recordingInfo,
    text,
    setCount,
  } = useRecording(name);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
        // Atualize o contador a cada segundo
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
  }, [isRecording, isPaused, pulseAnim, setCount]);

  useEffect(() => {
    const backAction = () => {
      cancelRecording();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      cancelRecording();
      stopRecording(); // Adicionando stopRecording aqui
      console.log('Componente GroupDetails desmontado');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>{name}</Title>
        {!isRecording && (
          <>
            <Description>{description}</Description>
          </>
        )}
        {isRecording && (
          <>
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
          </>
        )}

        {/* Listar gravações existentes apenas se não estiver gravando */}
        {!isRecording &&
          recordedAudioFiles.map((audio, index) => (
            <AudioPlayer key={index}>
              <Pressable
                onPress={() => {
                  if (currentPlayingAudioPath === audio.path) {
                    // Se o áudio atualmente em reprodução for o mesmo que o áudio clicado, parar a reprodução
                    stopRecording();
                  } else {
                    // Caso contrário, iniciar a reprodução do áudio clicado
                    playRecording(audio.path);
                  }
                }}>
                <Play
                  source={
                    currentPlayingAudioPath === audio.path && isAudioPlaying
                      ? icons.pauseiconButon
                      : icons.playiconButon
                  }
                />
              </Pressable>
              <AudioName>{audio.name}</AudioName>

              <Pressable onPress={() => deleteRecording(index)}>
                <Trash source={icons.trashicon} />
              </Pressable>
            </AudioPlayer>
          ))}
      </ScrollView>
      {/* Exibir botão de gravação inicial apenas se não estiver gravando */}
      {!isRecording && (
        <ButtonContainer>
          <InitialButton
            icon={icons.micRecordIcon}
            onPress={startRecording}
            backgroundColor={colors.red}
          />
        </ButtonContainer>
      )}

      <SaveRecordingModal
        visible={modalVisible}
        onClose={closeModal}
        addRecording={addRecording}
        recordingInfo={recordingInfo}
      />
    </Container>
  );
};

export default GroupDetails;
