import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NewRecording from '../../screens/NewRecording';
import {RootStackParamList} from '../types';
import Home from '../../screens/Home';
import React from 'react';

const Stack = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewRecording" component={NewRecording} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
