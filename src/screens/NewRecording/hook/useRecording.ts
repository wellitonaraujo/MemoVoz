import {UseRecordingReturnType} from '../../../models/UseRecordingReturnType';
import {useEffect, useState, useRef} from 'react';
import {Animated} from 'react-native';

const useRecording = (): UseRecordingReturnType => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('Toque no botão para começar');
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    const stopAnimation = () => {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    };

    if (isRecording && !isPaused) {
      startAnimation();
      timerRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    } else {
      stopAnimation();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      stopAnimation();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused, pulseAnim]);

  const startRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
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
    setText('Toque no botão para começar');
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
    pulseAnim,
  };
};

export default useRecording;
