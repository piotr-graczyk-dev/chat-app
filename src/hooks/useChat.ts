import { isImage, transformImageToMessageContent } from '@helpers/fileHelpers';
import * as Haptics from 'expo-haptics';
import { ChatCompletionMessageParam } from 'openai/resources';
import { useCallback, useRef, useState } from 'react';
import EventSource, { EventSourceListener } from 'react-native-sse';

import { FileAttachmentType } from './useFileAttachment';

export type Message = {
  id: string;
  text: string;
  createdAt: Date;
  isUser: boolean;
  attachment?: FileAttachmentType;
};

type StreamResponse = {
  content: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const isFirstChunkRef = useRef(true);

  const sendMessage = useCallback(
    async (inputText: string, attachment?: FileAttachmentType) => {
      if ((!inputText.trim() && !attachment) || isLoading) return;

      // Trigger light haptic feedback when sending message
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        createdAt: new Date(),
        isUser: true,
        attachment,
      };

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '',
        createdAt: new Date(),
        isUser: false,
      };

      setMessages(prev => [botMessage, userMessage, ...prev]);
      setIsLoading(true);
      isFirstChunkRef.current = true;

      try {
        const chatMessages = await Promise.all(
          messages.reverse().map(async message => {
            const messageData: ChatCompletionMessageParam = {
              role: message.isUser ? 'user' : 'assistant',
              content: message.text,
            };

            if (message.attachment && isImage(message.attachment)) {
              messageData.content = await transformImageToMessageContent(
                message.text,
                message.attachment,
              );
            }

            return messageData;
          }),
        );

        // Handle the current message
        const currentMessageData: ChatCompletionMessageParam = {
          role: 'user',
          content: inputText,
        };

        if (userMessage.attachment && isImage(userMessage.attachment)) {
          currentMessageData.content = await transformImageToMessageContent(
            inputText,
            userMessage.attachment,
          );
        }

        chatMessages.push(currentMessageData);

        const es = new EventSource('http://localhost:8081/chat', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messages: chatMessages,
          }),
          pollingInterval: 0, // Disable reconnections
        });

        eventSourceRef.current = es;

        const listener: EventSourceListener = event => {
          if (event.type === 'open') {
          } else if (event.type === 'message' && 'data' in event) {
            if (!event.data) {
              return;
            }

            if (event.data === '[DONE]') {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
              es.close();
              return;
            }

            try {
              const data = JSON.parse(event.data) as StreamResponse;

              if (!data || typeof data.content !== 'string') {
                return;
              }

              if (isFirstChunkRef.current) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                isFirstChunkRef.current = false;
              }

              setMessages(prev =>
                prev.map(msg =>
                  msg.id === botMessage.id
                    ? {
                        ...msg,
                        text: msg.text + data.content,
                      }
                    : msg,
                ),
              );
            } catch (e) {
              console.error('Failed to parse chunk:', e);
            }
          } else if (event.type === 'error' && 'message' in event) {
            throw new Error(event.message);
          } else if (
            event.type === 'exception' &&
            'message' in event &&
            'error' in event
          ) {
            throw event.error;
          }
        };

        es.addEventListener('open', listener);
        es.addEventListener('message', listener);
        es.addEventListener('error', listener);

        const timeoutId = setTimeout(() => {
          es.removeAllEventListeners();
          es.close();
          throw new Error('Request timed out');
        }, 40000);

        await new Promise<void>((resolve, reject) => {
          es.addEventListener('close', () => resolve());
          es.addEventListener('error', event => {
            if ('message' in event) {
              reject(event.message);
            } else {
              reject(new Error('Unknown error occurred'));
            }
          });
        });

        clearTimeout(timeoutId);
      } catch (error) {
        // Trigger error haptic feedback
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setMessages(prev => [
          {
            id: Date.now().toString(),
            text:
              error instanceof Error && error.message === 'Request timed out'
                ? 'Request timed out. Please try again.'
                : 'Sorry, something went wrong. Please try again.',
            createdAt: new Date(),
            isUser: false,
          },
          ...prev.slice(1),
        ]);
      } finally {
        if (eventSourceRef.current) {
          eventSourceRef.current.removeAllEventListeners();
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        setIsLoading(false);
        isFirstChunkRef.current = true;
      }
    },
    [isLoading, messages],
  );

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
