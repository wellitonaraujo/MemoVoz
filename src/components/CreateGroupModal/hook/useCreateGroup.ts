import {useState} from 'react';

interface CreateGroupModalProps {
  onClose: () => void;
  addGroupCard: (groupCard: {name: string; description: string}) => void;
}

const useCreateGroup = ({onClose, addGroupCard}: CreateGroupModalProps) => {
  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setGroupName('');
    setGroupDescription('');
    onClose();
  };

  const handleSave = () => {
    if (groupName && groupDescription) {
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
    openModal,
    closeModal,
    handleSave,
    setGroupName,
    setGroupDescription,
  };
};

export default useCreateGroup;
