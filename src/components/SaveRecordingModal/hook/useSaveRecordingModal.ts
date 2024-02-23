import {useState} from 'react';

interface SaveRecordingModalProps {
  onClose: () => void;
  addRecording: (name: string) => void;
}

const useSaveRecordingModal = ({
  onClose,
  addRecording,
}: SaveRecordingModalProps) => {
  const [visible, setVisible] = useState(false);
  const [recordingName, setRecordingName] = useState('');
  const [error, setError] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setRecordingName('');
    setIsEmpty(false);
    setError('');
    onClose();
  };

  const handleSave = () => {
    if (!recordingName) {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);
    addRecording(recordingName);
    setRecordingName('');
    closeModal();
  };

  return {
    visible,
    recordingName,
    error,
    openModal,
    closeModal,
    handleSave,
    setRecordingName,
    isEmpty,
    setIsEmpty,
  };
};

export default useSaveRecordingModal;
