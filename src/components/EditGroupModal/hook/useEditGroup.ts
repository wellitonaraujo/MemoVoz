// useEditGroup.ts
import {useState} from 'react';

interface EditGroupProps {
  groupDetails: {
    name: string;
    description: string;
  };
  onClose: () => void;
  editGroup: (
    groupName: string,
    updatedDetails: {name: string; description: string},
  ) => void;
}

const useEditGroup = ({groupDetails, onClose, editGroup}: EditGroupProps) => {
  const [editedGroupName, setEditedGroupName] = useState(groupDetails.name);
  const [editedGroupDescription, setEditedGroupDescription] = useState(
    groupDetails.description,
  );

  const handleSave = () => {
    if (editedGroupName && editedGroupDescription) {
      editGroup(groupDetails.name, {
        name: editedGroupName,
        description: editedGroupDescription,
      });
      onClose();
    }
  };

  return {
    editedGroupName,
    editedGroupDescription,
    setEditedGroupName,
    setEditedGroupDescription,
    handleSave,
  };
};

export default useEditGroup;
