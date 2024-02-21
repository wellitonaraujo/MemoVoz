import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import NewRecording from '../../screens/NewRecording';
import {RootStackParamList} from '../types';
import Home from '../../screens/Home';
import React from 'react';
import GroupDetails from '../../screens/GroupDetails';
import colors from '../../styles/colors';

const Stack = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: colors.white,
        }}
      />
      {/* <Stack.Screen
        name="NewRecording"
        component={NewRecording}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: 'Nova Gravação',
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
        }}
      /> */}
      <Stack.Screen
        name="GroupDetails"
        component={GroupDetails}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitle: 'Detalhes do Grupo',
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
