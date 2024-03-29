import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CreateGroupModal from '../../components/CreateGroupModal';
import InitialButton from '../../components/InitialButton';
import {ButtonContainer, Container, ListGroupTitle, Logo} from './styles';
import {RootStackParamList} from '../../navigation/types';
import SearchInput from '../../components/SearchInput';
import GroupCard from '../../components/GroupCard';
import {icons} from '../../components/icons';
import colors from '../../styles/colors';
import {ScrollView} from 'react-native';
import useHome from './hook/useHome';
import {imgs} from '../imgs';
import React from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  const {
    modalVisible,
    handlePress,
    onClose,
    groupCards,
    addGroupCard,
    handleSearch,
    filteredGroupCards,
    handleDelete,
    rotateStyle,
  } = useHome({
    navigation,
  });

  const hasGroupCards = groupCards.length > 0;

  return (
    <Container>
      <SearchInput placeholder="Buscar" onSearch={handleSearch} />
      {!hasGroupCards && <Logo source={imgs.logo} style={[rotateStyle]} />}

      <ScrollView showsVerticalScrollIndicator={false}>
        {hasGroupCards && <ListGroupTitle>Grupos</ListGroupTitle>}

        {filteredGroupCards.map((groupCard, index) => (
          <GroupCard
            groupId={''}
            key={index}
            {...groupCard}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </ScrollView>

      <ButtonContainer>
        <InitialButton
          icon={icons.createGroupIcon}
          onPress={handlePress}
          backgroundColor={colors.primary.s300}
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
