/**
 * @format
 */

import Routes from './src/navigation/routes';
import {StatusBar} from 'react-native';
import React from 'react';
import colors from './src/styles/colors';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <Routes />
    </>
  );
}

export default App;
