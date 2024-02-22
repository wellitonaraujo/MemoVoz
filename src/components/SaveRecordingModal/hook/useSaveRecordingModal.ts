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

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setRecordingName('');
    setError('');
    onClose();
  };

  const handleSave = () => {
    if (!recordingName) {
      setError('Por favor, preencha o campo Nome.');
      return;
    }
    addRecording(recordingName);
    setRecordingName('');
    setError('');
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
  };
};

export default useSaveRecordingModal;
