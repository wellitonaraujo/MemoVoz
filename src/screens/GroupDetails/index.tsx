// GroupDetails.tsx
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Container, Description, EditIcon, Title} from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {icons} from '../../components/icons';
import useHome from '../Home/hook/useHome';
import EditGroupModal from '../../components/EditGroupModal';
import {Pressable} from 'react-native';

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
  const {name, description}: any = route.params;

  const {modalVisible, onClose, editGroup, handlePress} = useHome({});

  return (
    <Container>
      <Title>{name}</Title>
      {/* <Pressable onPress={handlePress}>
        <EditIcon source={icons.penicon} />
      </Pressable> */}
      <Description>{description}</Description>

      <EditGroupModal
        visible={modalVisible}
        onClose={onClose}
        groupDetails={{name, description}}
        editGroup={editGroup}
      />
    </Container>
  );
};

export default GroupDetails;
