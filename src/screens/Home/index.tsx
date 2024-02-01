import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CreateGroupModal from '../../components/CreateGroupModal';
import InitialButton from '../../components/InitialButton';
import {ButtonContainer, Container, Logo} from './styles';
import {RootStackParamList} from '../../navigation/types';
import SearchInput from '../../components/SearchInput';
import {icons} from '../../components/icons';
import colors from '../../styles/colors';
import useHome from './hook/useHome';
import {imgs} from '../imgs';
import React from 'react';
import GroupCard from '../../components/GroupCard';
import {ScrollView} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  const {
    modalVisible,
    handlePress,
    onClose,
    goNewRecording,
    groupCards,
    addGroupCard,
  } = useHome({
    navigation,
  });

  const hasGroupCards = groupCards.length > 0;

  return (
    <Container>
      <SearchInput placeholder="Buscar Grupo..." />
      {!hasGroupCards && <Logo source={imgs.logo} />}

      <ScrollView showsVerticalScrollIndicator={false}>
        {groupCards.map((groupCard, index) => (
          <GroupCard key={index} {...groupCard} />
        ))}
      </ScrollView>

      <ButtonContainer>
        <InitialButton
          icon={icons.createGroupIcon}
          onPress={handlePress}
          backgroundColor={colors.white}
        />

        <InitialButton
          icon={icons.micRecordIcon}
          onPress={goNewRecording}
          backgroundColor={colors.red}
        />
      </ButtonContainer>

      <CreateGroupModal
        visible={modalVisible}
        onClose={onClose}
        addGroupCard={addGroupCard}
      />
    </Container>
  );
};

export default Home;
