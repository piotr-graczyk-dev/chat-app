import * as Haptics from 'expo-haptics';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import { useCallback, useState } from 'react';

type Props = {
  onTextChange: (text: string) => void;
};

export const useSpeechToText = ({ onTextChange }: Props) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Handle recognition events
  useSpeechRecognitionEvent('start', () => {
    setIsListening(true);
    setTranscript('');
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
  });

  useSpeechRecognitionEvent('result', event => {
    console.log('Speech recognition result:', event.results);
    if (event.results?.[0]) {
      setTranscript(event.results[0].transcript);
      onTextChange(event.results[0].transcript);
    }
  });

  useSpeechRecognitionEvent('error', event => {
    console.log('Speech recognition error:', event.error, event.message);
    setIsListening(false);
  });

  const startListening = useCallback(async () => {
    try {
      // Request permissions
      const result =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        console.warn('Speech recognition permission not granted');
        return;
      }

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Start speech recognition
      ExpoSpeechRecognitionModule.start({
        lang: 'en-US',
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
      });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      ExpoSpeechRecognitionModule.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
  };
};
