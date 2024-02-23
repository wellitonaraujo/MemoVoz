import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {ArrowBackIcon} from './styles';
import {icons} from '../icons';
import React from 'react';

const CustomBackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ArrowBackIcon source={icons.arronbackicon} />
    </TouchableOpacity>
  );
};

export default CustomBackButton;
