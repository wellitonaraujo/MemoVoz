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
  ButtonsContainer,
} from './styles';
import useEditGroup from './hook/useEditGroup';

interface EditGroupModalProps {
  visible: boolean;
  onClose: () => void;
  groupDetails: {
    name: string;
    description: string;
  };
  editGroup: (
    groupName: string,
    updatedDetails: {name: string; description: string},
  ) => void;
}

const EditGroupModal: React.FC<EditGroupModalProps> = ({
  visible,
  onClose,
  groupDetails,
  editGroup,
}) => {
  const {
    editedGroupName,
    editedGroupDescription,
    setEditedGroupName,
    setEditedGroupDescription,
    handleSave,
  } = useEditGroup({groupDetails, onClose, editGroup});
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
            placeholder="Nome do grupo"
            value={editedGroupName}
            onChangeText={setEditedGroupName}
            maxLength={24}
          />
          <TextAreaWithBorder
            placeholder="Descrição do grupo"
            multiline={false}
            value={editedGroupDescription}
            onChangeText={setEditedGroupDescription}
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

export default EditGroupModal;
