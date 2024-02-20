import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const Recorder = () => {
  const onStartRecord = async () => {
    await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      console.log('Recording . . . ', e);
      return;
    });
  };

  const onStopRecord = async () => {
    const audio = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'space-between'}}>
      <TouchableOpacity onPress={onStartRecord}>
        <Text>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onStopRecord}>
        <Text>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};
