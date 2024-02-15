import {useEffect, useState} from 'react';

const useRecording = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>(
    'Toque no botão abaixo para começar',
  );

  useEffect(() => {
    let timer: any;
    if (isRecording && !isPaused) {
      timer = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  const startRecording = () => {
    setIsRecording(true);
    setText('Gravando...');
    setCount(0);
  };

  const pauseRecording = () => {
    setIsPaused(true);
    setText('Gravação pausada');
  };

  const resumeRecording = () => {
    setIsPaused(false);
    setText('Gravando...');
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setText('Toque no botão abaixo para começar');
    setCount(0);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  return {
    isRecording,
    isPaused,
    count,
    text,
    startRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
    formatTime,
  };
};

export default useRecording;
