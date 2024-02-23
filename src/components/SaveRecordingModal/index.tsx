import PrimaryButton from '../PrimaryButton';
import {Modal, Text, View} from 'react-native';
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
  InfosWrapper,
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
  const {
    recordingName,
    setRecordingName,
    isEmpty,
    setIsEmpty,
    closeModal,
    handleSave,
  } = useSaveRecordingModal({
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
            onChangeText={text => {
              setRecordingName(text);
              setIsEmpty(false);
            }}
            maxLength={38}
            placeholderTextColor={colors.grey.s100}
            style={
              isEmpty
                ? {borderColor: colors.error.s200, borderWidth: 1}
                : {borderColor: colors.inputSearch.s100, borderWidth: 1}
            }
          />

          {recordingName.length > 37 ? (
            <ErrorLength>Nome muito grande</ErrorLength>
          ) : (
            <Text>{''}</Text>
          )}

          <InfosWrapper>
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
          </InfosWrapper>
          <ButtonsContainer>
            <PrimaryButton
              title="Salvar"
              onPress={handleSave}
              backgroundColor={colors.primary.s300}
              textColor={colors.grey.s100}
            />
            <PrimaryButton
              title="Excluir"
              backgroundColor={colors.inputSearch.s100}
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
