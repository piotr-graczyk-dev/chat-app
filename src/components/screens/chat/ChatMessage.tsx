import { isImage } from '@helpers/fileHelpers';
import { Message } from '@hooks/useChat';
import React from 'react';
import { Image, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {
  item: Message;
};

export const ChatMessage = React.memo(({ item }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.botMessage,
      ]}>
      {item.attachment && (
        <View style={styles.attachmentContainer}>
          {isImage(item.attachment) ? (
            <Image
              source={{ uri: item.attachment.uri }}
              style={styles.imageAttachment}
            />
          ) : (
            <View style={styles.filePreview}>
              <IconButton icon="file" size={24} />
              <Text style={styles.fileName} numberOfLines={1}>
                {item.attachment.file?.name}
              </Text>
            </View>
          )}
        </View>
      )}
      {item.text.trim() && (
        <Text
          variant="bodyMedium"
          style={[
            item.isUser ? styles.userMessageText : styles.botMessageText,
          ]}>
          {item.text}
        </Text>
      )}
    </View>
  );
});

const stylesheet = createStyleSheet(({ colors, sizes }) => ({
  messageContainer: {
    borderRadius: sizes.xxl,
    maxWidth: '80%',
    padding: sizes.xl,
    gap: sizes.md,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceVariant,
  },
  userMessageText: {
    color: colors.onPrimary,
  },
  botMessageText: {
    color: colors.onSurfaceVariant,
  },
  attachmentContainer: {
    borderRadius: sizes.md,
    overflow: 'hidden',
  },
  imageAttachment: {
    width: 100,
    height: 100,
    borderRadius: sizes.xxl,
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: sizes.sm,
    borderRadius: sizes.md,
  },
  fileName: {
    color: colors.onSurface,
    flex: 1,
    marginLeft: sizes.sm,
  },
}));

ChatMessage.displayName = 'ChatMessage';
