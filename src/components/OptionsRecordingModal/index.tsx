import {OptionsRecordingModalProps} from '../../models/OptionsRecordingModalProps';
import {Share, Pressable, Modal, TouchableWithoutFeedback} from 'react-native';
import {InfosWrapper} from '../SaveRecordingModal/styles';
import {InfosContainer, ValueTitle} from './styles';
import {icons} from '../icons';
import React from 'react';
import {
  IconsContainer,
  ModalContainer,
  ModalContent,
  Separator,
  Title,
  Icon,
} from './styles';

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
          <TouchableWithoutFeedback onPress={() => {}}>
            <ModalContent>
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
                <Separator />
                <IconsContainer>
                  <Pressable onPress={handleDelete}>
                    <Icon source={icons.trashicon} />
                  </Pressable>

                  <Pressable onPress={handleShare}>
                    <Icon source={icons.shareIcon} />
                  </Pressable>
                </IconsContainer>
              </InfosWrapper>
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OptionsRecordingModal;
