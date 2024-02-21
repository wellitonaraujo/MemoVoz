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
  groupId: string;
  name: string;
  description: string;
  onDelete?: () => void;
  cancelledAudioFilePath?: string;
}

const GroupCard: React.FC<GroupCardProps> = ({
  groupId,
  name,
  description,
  onDelete,
}) => {
  const navigation = useNavigation();

  const truncatedDescription =
    description.length > 27
      ? description.substring(0, 30) + '...'
      : description;

  const handlePress = () => {
    navigation.navigate('GroupDetails', {
      groupId,
      name,
      description,
    });
  };
  return (
    <Container>
      <IconContainer onPress={onDelete}>
        <ArronIcon source={icons.trashicon} />
      </IconContainer>
      <InfoContainer>
        <TitleCard>
          <Title>{name}</Title>
        </TitleCard>
        <Description>{truncatedDescription}</Description>
      </InfoContainer>

      <IconContainer onPress={handlePress}>
        <ArronIcon source={icons.arronicon} />
      </IconContainer>
    </Container>
  );
};
export default GroupCard;
