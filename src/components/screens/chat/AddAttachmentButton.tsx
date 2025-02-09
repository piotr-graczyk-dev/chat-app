import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';
import { Keyboard, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as DropdownMenu from 'zeego/dropdown-menu';

type AddAttachmentButtonProps = {
  onImageSelect: () => void;
  onPDFSelect: () => void;
  inputRef: React.RefObject<TextInput>;
};

const attachmentTypes = [
  {
    key: 'image',
    translationKey: 'select_image',
  },
  {
    key: 'pdf',
    translationKey: 'select_file',
  },
] as const;

export const AddAttachmentButton = ({
  onImageSelect,
  onPDFSelect,
  inputRef,
}: AddAttachmentButtonProps) => {
  const onSelect = (key: string) => {
    Haptics.selectionAsync();
    Keyboard.dismiss();
    inputRef.current?.blur();

    if (key === 'image') {
      onImageSelect();
    } else if (key === 'pdf') {
      onPDFSelect();
    }
  };

  const { t } = useTranslation('chat');
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton icon="paperclip" size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {attachmentTypes.map(type => (
          <DropdownMenu.Item key={type.key} onSelect={() => onSelect(type.key)}>
            {t(type.translationKey)}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
