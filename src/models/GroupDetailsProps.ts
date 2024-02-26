import {StackScreenProps} from '@react-navigation/stack';

export interface GroupDetailsProps {
  navigation: GroupDetailsScreenProps;
  route: {params: {groupId: string; name: string; description: string}};
}

type RootStackParamList = {
  Home: undefined;
  NewRecording: undefined;
  GroupDetails: {name: string; description: string};
};

type GroupDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'GroupDetails'
>;
