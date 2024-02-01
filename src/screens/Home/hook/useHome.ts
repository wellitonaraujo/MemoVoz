import {useState} from 'react';

interface UseHomeProps {
  navigation: any;
}
interface GroupCard {
  name: string;
  description: string;
}

const useHome = ({navigation}: UseHomeProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupCards, setGroupCards] = useState<GroupCard[]>([]);

  const addGroupCard = (groupCard: GroupCard) => {
    setGroupCards([...groupCards, groupCard]);
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  const onClose = () => {
    console.log('Modal fechado');
    setModalVisible(false);
  };

  const goNewRecording = () => {
    navigation.navigate('NewRecording');
  };

  return {
    modalVisible,
    handlePress,
    onClose,
    goNewRecording,
    groupCards,
    addGroupCard,
  };
};

export default useHome;
