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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  const {modalVisible, handlePress, onClose, goNewRecording} = useHome({
    navigation,
  });

  return (
    <Container>
      <SearchInput placeholder="Buscar Grupo..." />
      <Logo source={imgs.logo} />

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

      <CreateGroupModal visible={modalVisible} onClose={onClose} />
    </Container>
  );
};

export default Home;
