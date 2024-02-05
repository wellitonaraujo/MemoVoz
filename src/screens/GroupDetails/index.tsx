import React from 'react';
import {useRoute} from '@react-navigation/native';
import {Container, Description, EditIcon, Title} from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {icons} from '../../components/icons';

type RootStackParamList = {
  Home: undefined;
  NewRecording: undefined;
  GroupDetails: {name: string; description: string};
};

type GroupDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GroupDetails'
>;

interface Props {
  navigation: GroupDetailsScreenNavigationProp;
}

const GroupDetails: React.FC<Props> = () => {
  const route = useRoute();

  const {name, description} = route.params;

  return (
    <Container>
      <Title>{name}</Title>
      <EditIcon source={icons.penicon} />
      <Description>{description}</Description>
    </Container>
  );
};

export default GroupDetails;
