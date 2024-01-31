import {SearchInputProps} from '../../models/SearchInputProps';
import {Alert, TouchableOpacity} from 'react-native';
import {Container, SearchIcon, StyledInput} from './styles';
import colors from '../../styles/colors';
import {icons} from '../icons';
import React from 'react';

const SearchInput: React.FC<SearchInputProps> = ({placeholder, ...rest}) => {
  return (
    <Container>
      <StyledInput
        {...rest}
        placeholder={placeholder}
        placeholderTextColor={colors.grey.s200}
      />
      <TouchableOpacity onPress={() => Alert.alert('pão de batata')}>
        <SearchIcon source={icons.searchIcon} />
      </TouchableOpacity>
    </Container>
  );
};

export default SearchInput;
