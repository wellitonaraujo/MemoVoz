import React from 'react';
import {Container, Description, Title, TitleCard} from './styles';

interface GroupCardProps {
  name: string;
  description: string;
  onDelete: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({name, description, onDelete}) => {
  return (
    <Container onPress={onDelete}>
      <TitleCard>
        <Title>{name}</Title>
      </TitleCard>
      <Description>{description}</Description>
    </Container>
  );
};
export default GroupCard;
