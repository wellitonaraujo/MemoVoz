import {Pressable, Modal} from 'react-native';
import PrimaryButton from '../PrimaryButton';
import colors from '../../styles/colors';
import {icons} from '../icons';
import React, {useState} from 'react';
import {
  TextInputWithBorderBottom,
  ModalContainer,
  ModalContent,
  CloseIcon,
  ButtonsContainer,
  ErrorLength,
  Icon,
  Title,
  ValueTitle,
  InfosContainer,
  InfoTitle,
} from './styles';
import useSaveRecordingModal from './hook/useSaveRecordingModal';

interface SaveRecordingModalProps {
  visible: boolean;
  onClose: () => void;
  addRecording: (name: string) => void;
  recordingInfo: {
    date: string;
    duration: string;
    fileSize: string;
  };
}

const SaveRecordingModal: React.FC<SaveRecordingModalProps> = ({
  visible,
  onClose,
  addRecording,
  recordingInfo,
}) => {
  const {recordingName, setRecordingName} = useSaveRecordingModal({
    onClose,
    addRecording,
  });

  const {date, duration, fileSize} = recordingInfo;

  const [error, setError] = useState<string>('');

  const onSave = () => {
    if (!recordingName) {
      setError('O campo Nome é obrigatório.');
      return;
    }
    setError('');
    addRecording(recordingName);
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <ModalContainer>
        <ModalContent>
          <Pressable onPress={onClose}>
            <CloseIcon source={icons.closeicon} />
          </Pressable>
          <TextInputWithBorderBottom
            placeholder="Nome"
            value={recordingName}
            onChangeText={setRecordingName}
            maxLength={24}
          />
          {recordingName.length > 23 && (
            <ErrorLength>O nome do áudio não pode ser vazio.</ErrorLength>
          )}
          {error ? <ErrorLength>{error}</ErrorLength> : null}
          <InfoTitle>Informações</InfoTitle>

          <Title>Data da gravação:</Title>
          <InfosContainer>
            <Icon source={icons.dateicon} />
            <ValueTitle>{date}</ValueTitle>
          </InfosContainer>

          <Title>Duração:</Title>
          <InfosContainer>
            <Icon source={icons.clockicon} />
            <ValueTitle>{duration}</ValueTitle>
          </InfosContainer>

          <Title>Tamanho do arquivo:</Title>
          <InfosContainer>
            <Icon source={icons.fileicon} />
            <ValueTitle>{fileSize}</ValueTitle>
          </InfosContainer>

          <ButtonsContainer>
            <PrimaryButton title="Salvar" onPress={onSave} />
            <PrimaryButton
              title="Excluír"
              backgroundColor={colors.grey.s100}
              textColor={colors.primary.s300}
              onPress={onClose}
            />
          </ButtonsContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default SaveRecordingModal;
