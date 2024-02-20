import {useState} from 'react';

interface SaveRecordingModalProps {
  onClose: () => void;
  addRecording: (name: string) => void; // Alterado para aceitar apenas uma string
}

const useSaveRecordingModal = ({
  onClose,
  addRecording,
}: SaveRecordingModalProps) => {
  const [visible, setVisible] = useState(false);
  const [recordingName, setRecordingName] = useState('');

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setRecordingName('');
    onClose();
  };

  const handleSave = () => {
    if (recordingName) {
      addRecording(recordingName); // Passa apenas o nome do áudio
      setRecordingName('');
      closeModal();
    }
  };

  return {
    visible,
    recordingName,

    openModal,
    closeModal,
    handleSave,
    setRecordingName,
  };
};

export default useSaveRecordingModal;
