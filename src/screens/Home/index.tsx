import CreateGroupModal from '../../components/CreateGroupModal';
import InitialButton from '../../components/InitialButton';
import {ButtonContainer, Container, Logo} from './styles';
import SearchInput from '../../components/SearchInput';
import {icons} from '../../components/icons';
import colors from '../../styles/colors';
import {Alert} from 'react-native';
import {imgs} from '../imgs';
import React, {useState} from 'react';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const onClose = () => {
    console.log('Modal fechado');
    setModalVisible(false);
  };

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
          onPress={() => Alert.alert('Clicou')}
          backgroundColor={colors.red}
        />
      </ButtonContainer>

      <CreateGroupModal visible={modalVisible} onClose={onClose} />
    </Container>
  );
};

export default Home;
