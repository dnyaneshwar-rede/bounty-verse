// components/tiptap-toolbar.tsx
import { Editor } from '@tiptap/core'
import { useEditor, EditorContent } from "@tiptap/react";
import { Bold } from "@tiptap/extension-bold";
import { Code } from "@tiptap/extension-code";
import { Italic } from "@tiptap/extension-italic";
import { Strike } from "@tiptap/extension-strike";
import { ListItem } from "@tiptap/extension-list-item";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import History from "@tiptap/extension-history";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  ListIcon,
  ListOrderedIcon,
  UndoIcon,
  RedoIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolbarProps {
  editor: Editor | null
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const editorInstance = useEditor({
    extensions: [
      Bold,
      Code,
      Italic,
      Strike,
      ListItem,
      BulletList,
      OrderedList,
      History,
    ],
    // editor config...
  });

  if (!editorInstance) return null;

  const buttons = [
    {
      command: () => editorInstance.chain().focus().toggleBold().run(),
      isActive: editorInstance.isActive('bold'),
      label: 'Bold',
      icon: <BoldIcon className="w-4 h-4" />,
      shortcut: '⌘B',
    },
    {
      command: () => editorInstance.chain().focus().toggleItalic().run(),
      isActive: editorInstance.isActive('italic'),
      label: 'Italic',
      icon: <ItalicIcon className="w-4 h-4" />,
      shortcut: '⌘I',
    },
    {
      command: () => editorInstance.chain().focus().toggleStrike().run(),
      isActive: editorInstance.isActive('strike'),
      label: 'Strike',
      icon: <StrikethroughIcon className="w-4 h-4" />,
      shortcut: '⌘⇧S',
    },
    {
      command: () => editorInstance.chain().focus().toggleCode().run(),
      isActive: editorInstance.isActive('code'),
      label: 'Code',
      icon: <CodeIcon className="w-4 h-4" />,
      shortcut: '⌘E',
    },
    {
      command: () => editorInstance.chain().focus().toggleList('bulletList').run(), // Removed the empty object
      isActive: editorInstance.isActive('bulletList'),
      label: 'Bullet List',
      icon: <ListIcon className="w-4 h-4" />,
    },
    {
      command: () => editorInstance.chain().focus().toggleList('orderedList').run(), // Removed the empty object
      isActive: editorInstance.isActive('orderedList'),
      label: 'Numbered List',
      icon: <ListOrderedIcon className="w-4 h-4" />,
    },
    {
      command: () => editorInstance.chain().focus().undo().run(),
      isActive: false,
      label: 'Undo',
      icon: <UndoIcon className="w-4 h-4" />,
      disabled: !editorInstance.can().undo(),
    },
    {
      command: () => editorInstance.chain().focus().redo().run(),
      isActive: false,
      label: 'Redo',
      icon: <RedoIcon className="w-4 h-4" />,
      disabled: !editorInstance.can().redo(),
    }
  ];

  return (
    <div>
      <div className="toolbar">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.command}
            disabled={button.disabled}
            className={cn({ 'active': button.isActive })}
            title={button.label}
          >
            {button.icon}
            {button.shortcut && <span className="shortcut">{button.shortcut}</span>}
          </button>
        ))}
      </div>
      <EditorContent editor={editorInstance} />
    </div>
  );
};

export default Toolbar;