import {useEffect, useState} from 'react';

interface CreateGroupModalProps {
  onClose: () => void;
  addGroupCard: (groupCard: {name: string; description: string}) => void;
}

const useCreateGroup = ({onClose, addGroupCard}: CreateGroupModalProps) => {
  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [error, setError] = useState<string>('');

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setGroupName('');
    setGroupDescription('');
    onClose();
    setError('');
    console.log(error);
  };

  const handleSave = () => {
    if (!groupName) {
      setError('Por favor, preencha o campo Nome.');
      return;
    }
    if (groupName) {
      const newGroupCard = {name: groupName, description: groupDescription};
      addGroupCard(newGroupCard);
      setGroupName('');
      setGroupDescription('');
      closeModal();
    }
  };

  return {
    visible,
    groupName,
    groupDescription,
    error,
    openModal,
    closeModal,
    handleSave,
    setGroupName,
    setGroupDescription,
  };
};

export default useCreateGroup;
