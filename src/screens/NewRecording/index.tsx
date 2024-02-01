import React, {useState} from 'react';
import {imgs} from '../imgs';
import {Container, Logo} from './styles';
import {Text} from 'react-native';

const NewRecording = () => {
  const [text, setText] = useState<string>(
    'Toque no botão abaixo para começar',
  );

  const changeText = () => {
    setText('Gravando...');
  };

  return (
    <Container>
      <Logo source={imgs.logo} />
      <Text onPress={changeText}>{text}</Text>
    </Container>
  );
};

export default NewRecording;
