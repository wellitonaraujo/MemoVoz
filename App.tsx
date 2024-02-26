/**
 * @format
 */
import {Provider} from 'react-redux';
import Routes from './src/navigation/routes';
import {StatusBar} from 'react-native';
import React from 'react';
import colors from './src/styles/colors';
import store from './src/redux/store';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <Routes />
    </Provider>
  );
}

export default App;
