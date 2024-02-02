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

interface GroupCardProps {
  name: string;
  description: string;
  onDelete: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({name, description, onDelete}) => {
  const truncatedDescription =
    description.length > 40
      ? description.substring(0, 37) + '...'
      : description;

  return (
    <Container onPress={onDelete}>
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
