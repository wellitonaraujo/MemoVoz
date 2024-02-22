import React from 'react';
import {Share, Pressable, Modal, TouchableWithoutFeedback} from 'react-native';
import {
  Icon,
  IconsContainer,
  ModalContainer,
  ModalContent,
  Separator,
  Title,
} from './styles';
import {icons} from '../icons';
import {InfosContainer, ValueTitle} from './styles';

interface OptionsRecordingModalProps {
  visible: boolean;
  onClose: () => void;
  deleteRecording: (index: number) => void;
  selectedIndex: number;
  recordingInfo: {
    date: string;
    duration: string;
    fileSize: string;
  };
}

const OptionsRecordingModal: React.FC<OptionsRecordingModalProps> = ({
  visible,
  onClose,
  deleteRecording,
  selectedIndex,
  recordingInfo,
}) => {
  const handleShare = () => {
    Share.share({
      message: 'Ouça esse áudio!',
    });
  };
  const handleDelete = () => {
    deleteRecording(selectedIndex);
    onClose();
  };
  const {date, duration, fileSize} = recordingInfo;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalContainer>
          <TouchableWithoutFeedback onPress={onClose}>
            <ModalContent>
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
              <Separator />
              <IconsContainer>
                <Pressable onPress={handleDelete}>
                  <Icon source={icons.trashicon} />
                </Pressable>

                <Pressable onPress={handleShare}>
                  <Icon source={icons.shareIcon} />
                </Pressable>
              </IconsContainer>
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OptionsRecordingModal;
