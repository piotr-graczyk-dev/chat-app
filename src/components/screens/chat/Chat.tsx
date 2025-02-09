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
import { TextInput } from 'react-native-paper';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import { Message, useChat } from '@/hooks/useChat';
import { useFileAttachment } from '@/hooks/useFileAttachment';

import { AddAttachmentButton } from './AddAttachmentButton';
import { ChatMessage } from './ChatMessage';
import { FileAttachment } from './FileAttachment';

export const Chat = () => {
  const { styles, theme } = useStyles(stylesheet);
  const [inputText, setInputText] = useState('');
  const insets = useSafeAreaInsets();
  const inputRef = useRef<RNTextInput>(null);
  const listRef = useRef<FlashList<Message>>(null);

  const { messages, isLoading, sendMessage } = useChat();
  const { selectedFile, pickImage, pickFile, removeFile } = useFileAttachment();
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();
  const { t } = useTranslation('chat');

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
          <AddAttachmentButton
            inputRef={inputRef}
            onImageSelect={pickImage}
            onPDFSelect={pickFile}
          />
          <TextInput
            ref={inputRef}
            value={inputText}
            onChangeText={setInputText}
            placeholder={t('placeholder')}
            mode="outlined"
            style={styles.input}
            outlineStyle={styles.inputContent}
            multiline
            maxLength={1000}
            textAlignVertical="top"
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
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    maxHeight: 120,
    overflow: 'hidden',
  },
}));
