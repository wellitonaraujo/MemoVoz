import {ImageSourcePropType} from 'react-native';

export interface Icons {
  searchIcon: ImageSourcePropType;
  createGroupIcon: ImageSourcePropType;
  micRecordIcon: ImageSourcePropType;
  closeicon: ImageSourcePropType;
  arronicon: ImageSourcePropType;
  arronbackicon: ImageSourcePropType;
  trashicon: ImageSourcePropType;
  penicon: ImageSourcePropType;
  cancelicon: ImageSourcePropType;
  pauseicon: ImageSourcePropType;
  playicon: ImageSourcePropType;
  recordingicon: ImageSourcePropType;
  dateicon: ImageSourcePropType;
  clockicon: ImageSourcePropType;
  fileicon: ImageSourcePropType;
  playiconButon: ImageSourcePropType;
}

export interface InitialButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
  backgroundColor?: string;
}
