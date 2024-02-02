import React from 'react';
import {
  ArronIcon,
  Container,
  Description,
  IconContainer,
  InfoContainer,
  Title,
  TitleCard,
} from './styles';
import {icons} from '../icons';
import {useNavigation} from '@react-navigation/native';

interface GroupCardProps {
  name: string;
  description: string;
}

const GroupCard: React.FC<GroupCardProps> = ({name, description}) => {
  const truncatedDescription =
    description.length > 27
      ? description.substring(0, 30) + '...'
      : description;

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('GroupDetails', {
      name,
      description,
    });
  };
  return (
    <Container onPress={handlePress}>
      <InfoContainer>
        <TitleCard>
          <Title>{name}</Title>
        </TitleCard>
        <Description>{truncatedDescription}</Description>
      </InfoContainer>
      <ArronIcon source={icons.arronicon} />
      <IconContainer />
    </Container>
  );
};
export default GroupCard;
