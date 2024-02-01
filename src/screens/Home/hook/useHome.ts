import {useState} from 'react';

interface UseHomeProps {
  navigation: any;
}

const useHome = ({navigation}: UseHomeProps) => {
  const [modalVisible, setModalVisible] = useState(false);

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

  return {modalVisible, handlePress, onClose, goNewRecording};
};

export default useHome;
