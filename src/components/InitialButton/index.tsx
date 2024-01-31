import React from 'react'
import { CreateGroup, Icon } from './styles'
import { InitialButtonProps } from '../../models/Icons'


const InitialButton: React.FC<InitialButtonProps> = ({ icon, onPress, backgroundColor }) => {
  return (
    <CreateGroup onPress={onPress} backgroundColor={backgroundColor}>
      <Icon source={icon} />
    </CreateGroup>
  )
}

export default InitialButton;