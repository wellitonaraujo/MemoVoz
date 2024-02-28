import RNFS from 'react-native-fs';

export const generateAudioFilePath = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  console.log(randomNumber);
  return `${RNFS.ExternalDirectoryPath}/recording${randomNumber}.mp3`;
};
