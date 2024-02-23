// GroupDetails.tsx
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import SaveRecordingModal from '../../components/SaveRecordingModal';
import RecordingAnimation from '../../components/RecordingAnimation';
import {Animated, BackHandler, Pressable} from 'react-native';
import InitialButton from '../../components/InitialButton';
import {StackScreenProps} from '@react-navigation/stack';
import {formatTime} from '../../Utils/formatTime';
import useRecording from './hook/useRecording';
import React, {useEffect, useRef, useState} from 'react';
import {icons} from '../../components/icons';
import colors from '../../styles/colors';
import {imgs} from '../imgs';
import {
  RecordingContainer,
  ButtonContainer,
  RecordingButton,
  RecordingCount,
  RecordingTitle,
  CancelButton,
  AudioPlayer,
  Description,
  Container,
  AudioName,
  Title,
  Logo,
  Play,
  Icon,
} from './styles';
import OptionsRecordingModal from '../../components/OptionsRecordingModal';

interface GroupDetailsProps {
  navigation: GroupDetailsScreenProps;
  route: {params: {groupId: string; name: string; description: string}};
}

type RootStackParamList = {
  Home: undefined;
  NewRecording: undefined;
  GroupDetails: {name: string; description: string};
};

type GroupDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetails'
>;

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
    modalOptionsVisible,
    closeOptionsModal,
    optionsRecording,
    playRecording,
    stopRecording,
    modalVisible,
    currentPlayingAudioPath,
    isAudioPlaying,
    closeModal,
    recordingInfo,
    text,
    selectedIndex,
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

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>{name}</Title>
        {!isRecording && <Description>{description}</Description>}
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

              <Pressable onPress={optionsRecording}>
                <Icon source={icons.menuIcon} />
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

      <OptionsRecordingModal
        visible={modalOptionsVisible}
        onClose={closeOptionsModal}
        deleteRecording={deleteRecording}
        selectedIndex={selectedIndex}
        recordingInfo={recordingInfo}
      />

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
