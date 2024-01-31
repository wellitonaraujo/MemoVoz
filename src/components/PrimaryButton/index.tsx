import {TouchableOpacityProps} from 'react-native';
import {ButtonContainer, ButtonText} from './styles';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  textColor,
  borderColor,
  backgroundColor,
  ...props
}) => {
  return (
    <ButtonContainer
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      {...props}>
      <ButtonText textColor={textColor}>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default PrimaryButton;
