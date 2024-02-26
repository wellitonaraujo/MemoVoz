// store/index.js

import {configureStore} from '@reduxjs/toolkit';
import recordingReducer from '../reducers/recordingReducer';

const store = configureStore({
  reducer: {
    recording: recordingReducer,
  },
});

export default store;
