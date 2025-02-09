import { isImage } from '@helpers/fileHelpers';
import React from 'react';
import { Image, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { type FileAttachmentType } from '@/hooks/useFileAttachment';

type Props = {
  onFileRemove: () => void;
  selectedFile?: FileAttachmentType;
};

export const FileAttachment = ({ onFileRemove, selectedFile }: Props) => {
  const { styles } = useStyles(stylesheet);

  if (!selectedFile) return null;

  return (
    <Animated.View style={styles.previewContainer}>
      {isImage(selectedFile) ? (
        <Animated.View
          entering={FadeInDown.duration(400)}
          exiting={FadeOutDown}>
          <Image
            source={{ uri: selectedFile.uri }}
            style={styles.imagePreview}
          />
          <IconButton
            icon="close"
            size={16}
            mode="contained"
            style={styles.removeButton}
            onPress={onFileRemove}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={styles.filePreview}
          entering={FadeInDown.duration(400)}
          exiting={FadeOutDown}>
          <IconButton icon="file" size={24} />
          <Text style={styles.fileName} numberOfLines={1}>
            {selectedFile.name}
          </Text>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(({ colors, sizes }) => ({
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: sizes.md,
    marginBottom: sizes.xl,
  },
  imagePreview: {
    width: 84,
    height: 84,
    borderRadius: sizes.xxl,
  },
  filePreview: {
    padding: sizes.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileName: {
    color: colors.onSurfaceVariant,
    marginLeft: sizes.sm,
    flex: 1,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
}));
