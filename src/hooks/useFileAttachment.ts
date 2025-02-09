import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export type FileAttachmentType = DocumentPicker.DocumentPickerAsset;

export const useFileAttachment = () => {
  const [selectedFile, setSelectedFile] = useState<FileAttachmentType>();

  const requestPermission = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to upload images.',
        [{ text: 'OK' }],
      );
      return false;
    }
    return true;
  }, []);

  const pickImage = useCallback(async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];

        setSelectedFile({
          uri: asset.uri,
          mimeType: asset.mimeType || 'image/jpeg',
          name: asset.fileName || 'image.jpg',
          file: asset.file,
          size: asset.fileSize || 0,
        });
        return asset;
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.', [
        { text: 'OK' },
      ]);
    }
  }, [requestPermission]);

  const pickFile = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/*',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedFile(asset);

        return asset;
      }
    } catch (error) {
      console.error('Error picking PDF:', error);
      Alert.alert('Error', 'Failed to pick PDF. Please try again.', [
        { text: 'OK' },
      ]);
    }
  }, []);

  const removeFile = useCallback(() => {
    setSelectedFile(undefined);
  }, []);

  const isImage = useCallback((file: FileAttachmentType) => {
    return file.mimeType?.startsWith('image');
  }, []);

  const isFile = useCallback((file: FileAttachmentType) => {
    return file.mimeType?.startsWith('application');
  }, []);

  const getFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }, []);

  return {
    selectedFile,
    pickImage,
    pickFile,
    removeFile,
    isImage,
    isFile,
    getFileSize,
  };
};
