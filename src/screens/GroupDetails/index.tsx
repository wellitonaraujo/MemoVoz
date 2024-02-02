import {Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Container, Logo} from './styles';
import {imgs} from '../imgs';
import {Description, Title} from '../../components/GroupCard/styles';

const GroupDetails = () => {
  const route = useRoute();

  // Verifica se os parâmetros foram passados
  if (!route.params || !route.params.name || !route.params.description) {
    return (
      <View>
        <Text>Não há informações disponíveis para exibir.</Text>
      </View>
    );
  }
  const {name, description} = route.params;

  return (
    <Container>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <Logo source={imgs.logo} />
    </Container>
  );
};

export default GroupDetails;
