'use client';
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
    />
  );
};
