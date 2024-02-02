import {TouchableOpacityProps} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
}
