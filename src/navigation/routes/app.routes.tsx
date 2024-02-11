import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NewRecording from '../../screens/NewRecording';
import {RootStackParamList} from '../types';
import Home from '../../screens/Home';
import React from 'react';
import GroupDetails from '../../screens/GroupDetails';
import colors from '../../styles/colors';

const Stack = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerBackTitleVisible: false,
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewRecording" component={NewRecording} />
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
