import React, {createContext, useContext} from 'react';
import useRecording from './useRecording';

type RecordingContextType = ReturnType<typeof useRecording>;

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined,
);

export const useRecordingContext = () => {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error(
      'useRecordingContext must be used within a RecordingProvider',
    );
  }
  return context;
};

type RecordingProviderProps = {
  children: React.ReactNode;
};

export const RecordingProvider: React.FC<RecordingProviderProps> = ({
  children,
}) => {
  const value = useRecording();

  return (
    <RecordingContext.Provider value={value}>
      {children}
    </RecordingContext.Provider>
  );
};
