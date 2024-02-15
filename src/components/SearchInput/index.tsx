import {SearchInputProps} from '../../models/SearchInputProps';
import {Container, SearchIcon, StyledInput} from './styles';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import React, {useState} from 'react';
import {icons} from '../icons';

const SearchInput: React.FC<SearchInputProps> = ({placeholder, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleSearch}>
        <SearchIcon source={icons.searchIcon} />
      </TouchableOpacity>
      <StyledInput
        placeholder={placeholder}
        placeholderTextColor={colors.grey.s300}
        value={searchTerm}
        onChangeText={text => {
          setSearchTerm(text);
          onSearch(text);
        }}
        onSubmitEditing={handleSearch}
      />
    </Container>
  );
};

export default SearchInput;
