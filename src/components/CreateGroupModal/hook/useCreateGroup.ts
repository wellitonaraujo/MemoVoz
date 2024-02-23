import {useState} from 'react';

interface CreateGroupModalProps {
  onClose: () => void;
  addGroupCard: (groupCard: {name: string; description: string}) => void;
}

const useCreateGroup = ({onClose, addGroupCard}: CreateGroupModalProps) => {
  const [groupDescription, setGroupDescription] = useState('');
  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setGroupDescription('');
    setIsEmpty(false);
    setVisible(false);
    setGroupName('');
    setError('');
    onClose();
  };

  const handleSave = () => {
    if (!groupName) {
      setIsEmpty(true);
      return;
    }
    if (groupName) {
      const newGroupCard = {name: groupName, description: groupDescription};
      addGroupCard(newGroupCard);
      setGroupDescription('');
      setIsEmpty(false);
      setGroupName('');
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
    setIsEmpty,
    isEmpty,
  };
};

export default useCreateGroup;
