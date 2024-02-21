export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
};
