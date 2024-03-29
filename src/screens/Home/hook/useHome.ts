import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect, useRef} from 'react';
import {
  Alert,
  Animated,
  Easing,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  requestMultiple,
} from 'react-native-permissions';

interface UseHomeProps {
  navigation?: any;
}
interface GroupCard {
  name: string;
  description: string;
}

const useHome = ({navigation}: UseHomeProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupCards, setGroupCards] = useState<GroupCard[]>([]);
  const [searchedGroupCard, setSearchedGroupCard] = useState<GroupCard | null>(
    null,
  );

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadGroupCards();
  }, []);

  const loadGroupCards = async () => {
    try {
      const savedGroupCards = await AsyncStorage.getItem('groupCards');
      if (savedGroupCards !== null) {
        setGroupCards(JSON.parse(savedGroupCards));
      }
    } catch (error) {
      console.error('Erro ao carregar os grupos:', error);
    }
  };

  const saveGroupCards = async (groupCardsToSave: GroupCard[]) => {
    try {
      await AsyncStorage.setItem(
        'groupCards',
        JSON.stringify(groupCardsToSave),
      );
    } catch (error) {
      console.error('Erro ao salvar os grupos:', error);
    }
  };

  const addGroupCard = (groupCard: GroupCard) => {
    const updatedGroupCards = [...groupCards, groupCard];
    setGroupCards(updatedGroupCards);
    saveGroupCards(updatedGroupCards); // Salva os grupos atualizados no AsyncStorage
  };

  const deleteGroupCard = (index: number) => {
    const updatedGroupCards = [...groupCards];
    updatedGroupCards.splice(index, 1);
    setGroupCards(updatedGroupCards);
    saveGroupCards(updatedGroupCards);
  };

  const editGroup = (
    groupName: string,
    updatedDetails: {name: string; description: string},
  ) => {
    const updatedGroupCards = groupCards.map(groupCard => {
      if (groupCard.name === groupName) {
        return {...groupCard, ...updatedDetails};
      }
      return groupCard;
    });
    setGroupCards(updatedGroupCards);
    saveGroupCards(updatedGroupCards);
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      'Excluir Grupo',
      'Tem certeza de que deseja excluir este Grupo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => deleteGroupCard(index),
          style: 'destructive',
        },
      ],
    );
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const goNewRecording = () => {
    navigation.navigate('NewRecording');
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
    const foundGroupCard = groupCards.find(groupCard =>
      groupCard.name.toLowerCase().includes(term.toLowerCase()),
    );
    setSearchedGroupCard(foundGroupCard || null);
  };

  const filteredGroupCards = groupCards.filter(groupCard =>
    groupCard.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    rotateAnimation.start();

    return () => {
      rotateAnimation.stop();
    };
  }, [rotation]);

  const rotateStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['120deg', '360deg'],
        }),
      },
    ],
  };

  return {
    modalVisible,
    handlePress,
    onClose,
    goNewRecording,
    searchedGroupCard,
    deleteGroupCard,
    addGroupCard,
    searchTerm,
    handleDelete,
    filteredGroupCards,
    handleSearch,
    editGroup,
    rotateStyle,
    groupCards: groupCards.filter(groupCard =>
      groupCard.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  };
};

export default useHome;
