import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Keyboard,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { IconButton, TextInput } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import { Message, useChat } from '@/hooks/useChat';
import { useFileAttachment } from '@/hooks/useFileAttachment';
import { useSpeechToText } from '@/hooks/useSpeechToText';

import { AddAttachmentButton } from './AddAttachmentButton';
import { ChatMessage } from './ChatMessage';
import { FileAttachment } from './FileAttachment';

export const Chat = () => {
  const { styles, theme } = useStyles(stylesheet);
  const [inputText, setInputText] = useState('');
  const expandAnimation = useSharedValue(1);
  const insets = useSafeAreaInsets();
  const inputRef = useRef<RNTextInput>(null);
  const listRef = useRef<FlashList<Message>>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const { messages, isLoading, sendMessage } = useChat();
  const { selectedFile, pickImage, pickFile, removeFile } = useFileAttachment();
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();
  const { t } = useTranslation('chat');
  const { isListening, startListening, stopListening } = useSpeechToText({
    onTextChange: setInputText,
  });

  const handleSendMessage = async () => {
    if ((!inputText.trim() && !selectedFile) || isLoading) return;
    await Promise.all([
      sendMessage(inputText, selectedFile),
      setInputText(''),
      removeFile(),
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    ]);
  };

  const hiddenLayerStyle = useAnimatedStyle(() => ({
    height: -keyboardHeight.value - insets.bottom + theme.sizes.xxl,
  }));

  const toggleExpand = () => {
    expandAnimation.value = withSpring(expandAnimation.value === 0 ? 1 : 0, {
      mass: 0.5,
      damping: 15,
    });
    setIsExpanded(!isExpanded);
  };

  const actionButtonsStyle = useAnimatedStyle(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    width: withSpring(expandAnimation.value === 0 ? 130 : 0, {
      mass: 0.5,
      damping: 15,
    }),
    opacity: withSpring(expandAnimation.value === 0 ? 1 : 0, {
      mass: 0.5,
      damping: 15,
    }),
    overflow: 'hidden',
  }));

  const inputWrapperStyle = useAnimatedStyle(() => ({
    width: withSpring(expandAnimation.value === 1 ? '100%' : '60%', {
      mass: 0.5,
      damping: 15,
    }),
  }));

  return (
    <>
      <FlashList
        ref={listRef}
        data={messages}
        estimatedItemSize={80}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <ChatMessage item={item} />}
        inverted
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.inputContainer}>
        <FileAttachment selectedFile={selectedFile} onFileRemove={removeFile} />
        <View style={styles.inputRow}>
          <IconButton
            icon={isExpanded ? 'chevron-right' : 'chevron-left'}
            animated
            onPress={toggleExpand}
          />
          <Animated.View style={actionButtonsStyle}>
            <AddAttachmentButton
              inputRef={inputRef}
              onImageSelect={pickImage}
              onPDFSelect={pickFile}
            />
            <IconButton
              icon={isListening ? 'microphone-off' : 'microphone'}
              onPress={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              iconColor={
                isListening ? theme.colors.primary : theme.colors.onSurface
              }
            />
          </Animated.View>
          <Animated.View style={[styles.inputWrapper, inputWrapperStyle]}>
            <TextInput
              ref={inputRef}
              value={inputText}
              onBlur={() => {
                expandAnimation.value = withSpring(0, {
                  mass: 0.5,
                  damping: 15,
                });
                setIsExpanded(false);
              }}
              onFocus={() => {
                expandAnimation.value = withSpring(1, {
                  mass: 0.5,
                  damping: 15,
                });
                setIsExpanded(true);
              }}
              onChangeText={setInputText}
              placeholder={t('placeholder')}
              mode="outlined"
              style={styles.input}
              outlineStyle={styles.inputContent}
              multiline
              maxLength={1000}
              textAlignVertical="center"
              onSubmitEditing={handleSendMessage}
              right={
                <TextInput.Icon
                  icon={isLoading ? () => <ActivityIndicator /> : 'send'}
                  disabled={isLoading}
                  onPress={() => {
                    handleSendMessage();
                    Keyboard.dismiss();
                  }}
                />
              }
            />
          </Animated.View>
        </View>
        <Animated.View style={[hiddenLayerStyle]} />
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, sizes }) => ({
  container: {
    flex: 1,
  },
  listContent: {
    padding: sizes.lg,
  },
  inputContent: {
    borderRadius: sizes.lg,
    borderWidth: UnistylesRuntime.hairlineWidth,
    minHeight: 40,
  },
  separator: {
    height: sizes.xxl,
  },
  inputContainer: {
    padding: sizes.xxl,
    borderTopWidth: UnistylesRuntime.hairlineWidth,
    borderTopColor: colors.outline,
    backgroundColor: colors.background,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.md,
  },
  inputWithButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    minHeight: 40,
    maxHeight: 120,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 40,
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
