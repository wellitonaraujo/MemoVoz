import styled from 'styled-components/native';
import colors from '../../styles/colors';

import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${colors.background};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  width: 100%;
  height: viewPortHeight / 1.8;
`;

export const InfosContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(14)}px;
  align-items: center;
  padding: 0 ${RFValue(16)}px;
`;

export const Icon = styled.Image`
  height: ${RFValue(23)}px;
  width: ${RFValue(23)}px;
  opacity: 1;
`;

export const ValueTitle = styled.Text`
  color: ${colors.grey.s200};
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(10)}px;
  letter-spacing: 1.5px;
  font-weight: 300;
`;

export const Title = styled.Text`
  color: ${colors.grey.s200};
  font-size: ${RFValue(15)}px;
  padding: ${RFValue(16)}px 0 ${RFValue(10)}px ${RFValue(16)}px;
  letter-spacing: 1.5px;
`;

export const IconsContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: ${RFValue(5)}px ${RFValue(16)}px ${RFValue(10)}px ${RFValue(16)}px;
`;

export const InfoTitle = styled.Text`
  color: ${colors.grey.s200};
  font-size: ${RFValue(16)}px;
  font-family: 'Poppins-Light';
  letter-spacing: 1.5px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${colors.inputSearch.s100};
  margin-vertical: ${RFValue(15)}px;
`;
