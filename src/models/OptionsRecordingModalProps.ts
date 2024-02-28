export interface OptionsRecordingModalProps {
  visible: boolean;
  onClose: () => void;
  deleteRecording: (index: number) => void;
  selectedIndex: number;
  onShare: () => void;
  recordingInfo: {
    date: string;
    duration: string;
    fileSize: string;
  };
}
