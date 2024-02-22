import useCreateGroup from './hook/useCreateGroup';
import {Modal, Text, View} from 'react-native';
import PrimaryButton from '../PrimaryButton';
import colors from '../../styles/colors';
import React, {useState} from 'react';
import {
  TextInputWithBorderBottom,
  TextAreaWithBorder,
  ModalContainer,
  ModalContent,
  ButtonsContainer,
  ErrorLength,
  Title,
} from './styles';
import {TouchableWithoutFeedback} from 'react-native';

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
    error,
    closeModal,
  } = useCreateGroup({onClose, addGroupCard});

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <ModalContainer>
          <TouchableWithoutFeedback onPress={() => {}}>
            <ModalContent>
              <Title>Novo grupo</Title>
              <TextInputWithBorderBottom
                placeholder="Nome"
                value={groupName}
                onChangeText={setGroupName}
                maxLength={24}
                placeholderTextColor={colors.grey.s200}
              />
              {groupName.length > 23 && (
                <ErrorLength>
                  O nome do grupo não pode ter mais de 24 caracteres.
                </ErrorLength>
              )}
              {error ? <ErrorLength>{error}</ErrorLength> : <Text>{''}</Text>}
              <TextAreaWithBorder
                placeholder="Descrição"
                multiline={false}
                value={groupDescription}
                onChangeText={setGroupDescription}
                placeholderTextColor={colors.grey.s200}
              />
              <ButtonsContainer>
                <PrimaryButton
                  title="Salvar"
                  onPress={handleSave}
                  backgroundColor={colors.grey.s100}
                  textColor={colors.primary.s300}
                />
              </ButtonsContainer>
            </ModalContent>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateGroupModal;
