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
const audioRecorderPlayer = new AudioRecorderPlayer();

interface GroupDetailsProps {
  route: {params: {groupId: string; name: string; description: string}};
}

const GroupDetails: React.FC<GroupDetailsProps> = ({route}) => {
  const {name, description} = route.params;

  const [pulseAnim] = useState(new Animated.Value(1));
  const [recordedAudioFiles, setRecordedAudioFiles] = useState<
    {name: string; path: string}[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempAudioFilePath, setTempAudioFilePath] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentPlayingAudioPath, setCurrentPlayingAudioPath] =
    useState<string>('');
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Toque no botão para começar');
  const [audioFilePath, setAudioFilePath] = useState('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [recordingInfo, setRecordingInfo] = useState({
    date: '',
    duration: '',
    fileSize: '',
  });

  // Função para abrir o modal
  const openModal = async () => {
    setModalVisible(true);
    const date = new Date().toLocaleString('pt-BR');
    const duration = formatTime(count);

    try {
      const fileExists = await RNFS.exists(audioFilePath);
      // Verificar se o arquivo de áudio ainda existe
      if (fileExists) {
        const fileStat = await RNFS.stat(audioFilePath);
        const fileSize = bytesToKiloBytes(fileStat.size);
        setRecordingInfo({date, duration, fileSize});
      } else {
        console.log('O arquivo de áudio não existe mais');
      }
    } catch (error) {
      console.log('Erro ao obter o tamanho do arquivo:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const generateAudioFilePath = () => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // Gera um número aleatório entre 1 e 1000
    console.log(randomNumber);
    return `${RNFS.DocumentDirectoryPath}/recording${randomNumber}.mp3`;
  };

  const startRecording = async () => {
    try {
      // Verificar permissão de gravação de áudio
      const recordAudioPermission = await check(
        PERMISSIONS.ANDROID.RECORD_AUDIO,
      );

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
      console.log('Falha ao iniciar a gravação', error);
    }
  };

  const pauseRecording = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
      setIsPaused(true);
      setText('Gravação em espera...');
      console.log('Gravação em espera ');
    } catch (error) {
      console.log('Falha ao pausar a gravação...', error);
    }
  };

  const resumeRecording = async () => {
    try {
      await audioRecorderPlayer.resumeRecorder();
      setIsPaused(false);
      setText('Gravando...');
      console.log('Gravação retomada ');
    } catch (error) {
      console.log('Falha ao retomar a gravação', error);
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

      // Salvando o novo arquivo de áudio no AsyncStorage
      try {
        const groupAudioFilesJSON = await AsyncStorage.getItem(name); // Obtendo os arquivos de áudio existentes
        let groupAudioFiles = groupAudioFilesJSON
          ? JSON.parse(groupAudioFilesJSON)
          : [];
        groupAudioFiles.push(newAudioFile); // Adicionando o novo arquivo de áudio
        await AsyncStorage.setItem(name, JSON.stringify(groupAudioFiles)); // Salvando no AsyncStorage
      } catch (error) {
        console.log('Erro ao salvar o novo arquivo de áudio:', error);
      }

      setTempAudioFilePath('');
      setCount(0);
      closeModal();
    }
  };

  // Função para excluir um arquivo de áudio
  const deleteRecording = async (index: number) => {
    const updatedAudioFiles = [...recordedAudioFiles];
    updatedAudioFiles.splice(index, 1);
    setRecordedAudioFiles(updatedAudioFiles);
    stopRecording();
    // Atualizando o AsyncStorage após a exclusão
    try {
      await AsyncStorage.setItem(name, JSON.stringify(updatedAudioFiles));
    } catch (error) {
      console.error(
        'Erro ao excluir o arquivo de áudio do AsyncStorage:',
        error,
      );
    }
  };

  const playRecording = async (audioPath: string) => {
    try {
      if (currentPlayingAudioPath) {
        await audioRecorderPlayer.stopPlayer();
      }
      await audioRecorderPlayer.startPlayer(audioPath);
      setCurrentPlayingAudioPath(audioPath);
      setIsAudioPlaying(true); // Definir como true ao iniciar a reprodução
    } catch (error) {
      console.log('Falha ao reproduzir o áudio', error);
    }
  };

  // Função para parar a reprodução de um áudio
  const stopRecording = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      setCurrentPlayingAudioPath('');
      setIsAudioPlaying(false); // Definir como false ao parar a reprodução
    } catch (error) {
      console.log('Falha ao parar o áudio', error);
    }
  };

  useEffect(() => {
    // Função para carregar os arquivos de áudio do AsyncStorage ao montar o componente
    const loadRecordedAudioFiles = async () => {
      try {
        const groupAudioFilesJSON = await AsyncStorage.getItem(name); // Usando o nome do grupo como chave
        if (groupAudioFilesJSON) {
          const groupAudioFiles = JSON.parse(groupAudioFilesJSON);
          setRecordedAudioFiles(groupAudioFiles);
        }
      } catch (error) {
        console.error('Erro ao carregar arquivos de áudio:', error);
      }
    };

    loadRecordedAudioFiles(); // Carregar arquivos de áudio ao montar o componente

    return () => {};
  }, [name]);

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

  useEffect(() => {
    const backAction = () => {
      cancelRecording();
      // Retornar true para indicar que o evento de back foi manipulado
      return true;
    };

    // Adicionar um listener para o evento de back
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Função que é executada quando o componente é desmontado
    return () => {
      // Remover o listener do evento de back
      backHandler.remove();
      // Cancelar a gravação ao sair da tela
      cancelRecording();
      stopRecording();
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
