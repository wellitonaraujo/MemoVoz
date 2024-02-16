/**
 * @format
 */

import Routes from './src/navigation/routes';
import {StatusBar} from 'react-native';
import React from 'react';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Routes />
    </>
  );
}

export default App;
