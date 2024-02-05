import {Alert} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native'; // Importando o hook useNavigation

interface GroupCard {
  name: string;
  description: string;
}

const useDeleteGroup = () => {
  const navigation = useNavigation(); // Usando o hook useNavigation para acessar a navegação
  const [groupCards, setGroupCards] = useState<GroupCard[]>([]);

  const deleteGroupCard = (index: number) => {
    const updatedGroupCards = [...groupCards];
    updatedGroupCards.splice(index, 1);
    setGroupCards(updatedGroupCards);
    navigation.goBack(); // Navega de volta após excluir o grupo
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      'Excluir Card',
      'Tem certeza de que deseja excluir este card?',
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

  return {
    handleDelete,
    deleteGroupCard,
  };
};

export default useDeleteGroup;
