import { FileAttachmentType } from '@hooks/useFileAttachment';
import * as FileSystem from 'expo-file-system';
import { ChatCompletionContentPart } from 'openai/resources';

export const isImage = (file: FileAttachmentType) => {
  return file.mimeType?.startsWith('image');
};

export const isFile = (file: FileAttachmentType) => {
  return file.mimeType?.startsWith('application');
};

export const transformImageToMessageContent = async (
  text: string,
  attachment: FileAttachmentType,
): Promise<string | ChatCompletionContentPart[]> => {
  if (!isImage(attachment)) {
    return text;
  }

  const base64 = await FileSystem.readAsStringAsync(attachment.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return [
    {
      type: 'text',
      text,
    },
    {
      type: 'image_url',
      image_url: {
        url: `data:${attachment.mimeType?.toLowerCase()};base64,${base64}`,
      },
    },
  ];
};
