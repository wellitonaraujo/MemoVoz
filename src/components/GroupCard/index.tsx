import React from 'react';
import {
  Container,
  Description,
  InfoContainer,
  Title,
  TitleCard,
} from './styles';

interface GroupCardProps {
  name: string;
  description: string;
}

const GroupCard: React.FC<GroupCardProps> = ({name, description}) => {
  return (
    <Container>
      <TitleCard>
        <Title>{name}</Title>
      </TitleCard>
      <Description>{description}</Description>
    </Container>
  );
};
export default GroupCard;
