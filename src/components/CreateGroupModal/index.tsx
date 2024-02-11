import useCreateGroup from './hook/useCreateGroup';
import {Pressable, Modal, Text} from 'react-native';
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
  ButtonsContainer,
  ErrorLength,
} from './styles';

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
  addGroupCard: (groupCard: {name: string; description: string}) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  visible,
  onClose,
  addGroupCard,
}) => {
  const {
    groupName,
    groupDescription,
    handleSave,
    setGroupName,
    setGroupDescription,
  } = useCreateGroup({onClose, addGroupCard});
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
            value={groupName}
            onChangeText={setGroupName}
            maxLength={24}
          />
          {groupName.length > 23 && (
            <ErrorLength>
              O nome do grupo não pode ter mais de 24 caracteres.
            </ErrorLength>
          )}
          <TextAreaWithBorder
            placeholder="Descrição"
            multiline={false}
            value={groupDescription}
            onChangeText={setGroupDescription}
          />
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

export default CreateGroupModal;
