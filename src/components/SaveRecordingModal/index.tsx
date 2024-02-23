import PrimaryButton from '../PrimaryButton';
import {Modal, Text} from 'react-native';
import colors from '../../styles/colors';
import {icons} from '../icons';
import React from 'react';
import {
  TextInputWithBorderBottom,
  ModalContainer,
  ModalContent,
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
  const {recordingName, setRecordingName, error, closeModal, handleSave} =
    useSaveRecordingModal({
      onClose,
      addRecording,
    });

  const {date, duration, fileSize} = recordingInfo;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <ModalContainer>
        <ModalContent>
          <TextInputWithBorderBottom
            placeholder="Nome"
            value={recordingName}
            onChangeText={setRecordingName}
            maxLength={24}
            placeholderTextColor={colors.grey.s100}
          />
          {recordingName.length > 23 && (
            <ErrorLength>O nome do áudio não pode ser vazio.</ErrorLength>
          )}
          {error ? <ErrorLength>{error}</ErrorLength> : <Text>{''}</Text>}
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
            <PrimaryButton
              title="Salvar"
              onPress={handleSave}
              backgroundColor={colors.grey.s100}
              textColor={colors.primary.s300}
            />
            <PrimaryButton
              title="Excluir"
              backgroundColor={colors.inputBorder.s100}
              textColor={colors.grey.s100}
              onPress={closeModal}
            />
          </ButtonsContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default SaveRecordingModal;
