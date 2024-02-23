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
    isEmpty,
    closeModal,
    setIsEmpty,
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
                onChangeText={text => {
                  setGroupName(text);
                  setIsEmpty(false);
                }}
                maxLength={28}
                placeholderTextColor={colors.grey.s300}
                style={
                  isEmpty
                    ? {borderColor: colors.error.s200, borderWidth: 1}
                    : {borderColor: colors.inputSearch.s100, borderWidth: 1}
                }
              />
              {groupName.length > 27 ? (
                <ErrorLength>Nome muito grande</ErrorLength>
              ) : (
                <Text>{''}</Text>
              )}

              <TextAreaWithBorder
                placeholder="Descrição"
                multiline={false}
                value={groupDescription}
                onChangeText={setGroupDescription}
                placeholderTextColor={colors.grey.s300}
              />
              <ButtonsContainer>
                <PrimaryButton
                  title="Salvar"
                  onPress={handleSave}
                  backgroundColor={colors.primary.s300}
                  textColor={colors.white}
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
