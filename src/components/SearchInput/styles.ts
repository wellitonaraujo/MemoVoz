import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import colors from "../../styles/colors";
import { Dimensions, Image } from "react-native";

const screenHeight = Dimensions.get('window').height;

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    padding: 0 10px;
    background-color: ${colors.primary.s100};
    margin-top: ${screenHeight * 0.02}px;
    font-size: 30px;
`;

export const StyledInput = styled(TextInput)`
  flex: 1;
  height: 50px;
`;

export const PlaceholderText = styled.Text`
  position: absolute;
  left: 12px;
  top: 10px;
`;

export const SearchIcon = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;
