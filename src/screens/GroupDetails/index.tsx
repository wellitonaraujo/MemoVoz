// GroupDetails.tsx
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import OptionsRecordingModal from '../../components/OptionsRecordingModal';
import SaveRecordingModal from '../../components/SaveRecordingModal';
import RecordingAnimation from '../../components/RecordingAnimation';
import {GroupDetailsProps} from '../../models/GroupDetailsProps';
import InitialButton from '../../components/InitialButton';
import {formatTime} from '../../Utils/formatTime';
import {Animated, Pressable} from 'react-native';
import useRecording from './hook/useRecording';
import React, {useEffect, useRef} from 'react';
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

const GroupDetails: React.FC<GroupDetailsProps> = ({route}) => {
  const {name, description} = route.params;

  // const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  // useEffect(() => {
  //   dispatch(recordingActions.startRecording());
  //   dispatch(recordingActions.resumeRecording());
  //   dispatch(recordingActions.cancelRecording());
  //   dispatch(recordingActions.addRecording({name: '', path: ''}));
  //   dispatch(recordingActions.deleteRecording(0));
  //   dispatch(recordingActions.playRecording(currentPlayingAudioPath));
  //   dispatch(recordingActions.stopRecording());
  //   dispatch(recordingActions.setModalVisible(true));
  //   dispatch(recordingActions.setModalOptionVisible(true));
  //   dispatch(recordingActions.setSelectedIndex(0));
  //   dispatch(
  //     recordingActions.setRecordingInfo({date: '', duration: '', fileSize: ''}),
  //   );
  // }, [dispatch]);

  const {
    recordedAudioFiles,
    isRecording,
    isPaused,
    count,
    startRecorder,
    pauseRecorder,
    resumeRecorder,
    stopRecorder,
    addRecording,
    deleteRecording,
    startPlayer,
    stopPlayer,
    resumePlayer,
    modalVisible,
    currentPlayingAudioPath,
    isAudioPlaying,
    closeModal,
    recordingInfo,
    handleSelectItem,
    modalOptionsVisible,
    text,
    selectedIndex,
    setCount,
    closeOptionsModal,
    pausePlayer,
    handleShare,
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
    return () => {
      stopRecorder();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <TouchableOpacity onPress={pauseRecorder}>
                    <RecordingButton source={icons.pauseicon} />
                  </TouchableOpacity>
                  <Pressable onPress={stopRecorder}>
                    <CancelButton source={icons.cancelicon} />
                  </Pressable>
                </>
              ) : isPaused ? (
                <>
                  <TouchableOpacity onPress={resumeRecorder}>
                    <RecordingButton source={icons.playicon} />
                  </TouchableOpacity>
                  <Pressable onPress={stopRecorder}>
                    <CancelButton source={icons.cancelicon} />
                  </Pressable>
                </>
              ) : (
                <TouchableOpacity onPress={startRecorder}>
                  <RecordingButton source={icons.recordingicon} />
                </TouchableOpacity>
              )}
            </RecordingContainer>
          </>
        )}

        {!isRecording &&
          recordedAudioFiles.map((audio, index) => (
            <AudioPlayer key={index}>
              <Pressable
                onPress={() => {
                  if (currentPlayingAudioPath === audio.path) {
                    // Se o áudio atualmente em reprodução for o mesmo que o áudio clicado, pausa ou retoma a reprodução
                    if (isAudioPlaying) {
                      pausePlayer();
                    } else {
                      resumePlayer();
                    }
                  } else {
                    // Caso contrário, inicia a reprodução do áudio clicado
                    startPlayer(audio.path);
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

              <Pressable onPress={() => handleSelectItem(index)}>
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
            onPress={startRecorder}
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
        onShare={handleShare}
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
