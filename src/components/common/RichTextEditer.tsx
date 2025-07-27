'use client';
import { useTheme } from 'next-themes';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/shadcn/style.css';
import { PartialBlock } from '@blocknote/core';

export const RichTextEditer = ({
  onChange,
  initialContent,
  isEditable = false,
}: {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  initialContent: any;
  isEditable: boolean;
}) => {
  const { theme } = useTheme();
  const editor = useCreateBlockNote({
    initialContent: initialContent?.length
      ? (initialContent as PartialBlock[])
      : undefined,
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={(e) => {
        onChange?.(e.document);
      }}
      data-testid="blocknote-editor"
      editable={isEditable}
      theme={theme as 'light' | 'dark'}
      className="rounded-md border border-gray-400 dark:border-gray-800"
    />
  );
};
