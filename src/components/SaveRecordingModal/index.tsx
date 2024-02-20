import {Pressable, Modal} from 'react-native';
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
} from './styles';
import useSaveRecordingModal from './hook/useSaveRecordingModal';

interface SaveRecordingModalProps {
  visible: boolean;
  onClose: () => void;
  addRecording: (name: string) => void; // Corrigido para receber apenas o nome do áudio
}

const SaveRecordingModal: React.FC<SaveRecordingModalProps> = ({
  visible,
  onClose,
  addRecording,
}) => {
  const {recordingName, handleSave, setRecordingName} = useSaveRecordingModal({
    onClose,
    addRecording,
  });
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
            <ErrorLength>
              O nome do áudio não pode ter mais de 24 caracteres.
            </ErrorLength>
          )}
          <ButtonsContainer>
            <PrimaryButton title="Salvar" onPress={handleSave} />
            <PrimaryButton
              title="Cancelar"
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
