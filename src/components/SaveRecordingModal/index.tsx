import {Pressable, Modal, Text, Image} from 'react-native';
import PrimaryButton from '../PrimaryButton';
import colors from '../../styles/colors';
import {icons} from '../icons';
import React from 'react';
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
  const {recordingName, handleSave, setRecordingName} = useSaveRecordingModal({
    onClose,
    addRecording,
  });

  const {date, duration, fileSize} = recordingInfo;
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

          {recordingName.length > 23 && (
            <ErrorLength>O nome do áudio não pode ser vazio.</ErrorLength>
          )}
          <ButtonsContainer>
            <PrimaryButton title="Salvar" onPress={handleSave} />
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
