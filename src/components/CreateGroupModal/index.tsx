import {ButtonContainer} from '../../screens/Home/styles';
import {Pressable, Modal} from 'react-native';
import PrimaryButton from '../PrimaryButton';
import colors from '../../styles/colors';
import {icons} from '../icons';
import React from 'react';
import {
  TextInputWithBorderBottom,
  TextAreaWithBorder,
  ModalContainer,
  ModalContent,
  CloseIcon,
} from './styles';

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  visible,
  onClose,
}) => {
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
          <TextInputWithBorderBottom placeholder="Nome do grupo" />
          <TextAreaWithBorder
            placeholder="Descrição do grupo"
            multiline={false}
          />
          <ButtonContainer>
            <PrimaryButton title="Salvar" onPress={() => console.log('')} />
            <PrimaryButton
              title="Cancelar"
              backgroundColor={colors.grey.s100}
              textColor={colors.primary.s200}
              onPress={onClose}
            />
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;
