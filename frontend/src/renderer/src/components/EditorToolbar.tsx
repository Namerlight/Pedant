// The row of formatting buttons above the editor.
// "editor" is the Tiptap editor object created in EditorPanel.
// Every button runs a Tiptap command, e.g. editor.chain().focus().toggleBold().run()
//   chain()  = start a list of commands
//   focus()  = put the cursor back in the editor (clicking a button steals focus)
//   run()    = actually do it
import { useState } from 'react'
import { Editor, useEditorState } from '@tiptap/react'
import {
  Undo2,
  Redo2,
  List,
  ListOrdered,
  TextQuote,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Highlighter,
  Link,
  Check,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify
} from 'lucide-react'

// One square icon button. "active" lights it up (e.g. Bold when the cursor is in bold text).
function ToolbarButton(props: {
  title: string
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode // the icon placed between <ToolbarButton> ... </ToolbarButton>
}): React.JSX.Element {
  return (
    <button
      className={props.active ? 'tb-button active' : 'tb-button'}
      title={props.title}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

// Thin vertical line between button groups.
function Divider(): React.JSX.Element {
  return <div className="tb-divider" />
}

function EditorToolbar(props: { editor: Editor }): React.JSX.Element {
  const editor = props.editor

  // useState = a variable that, when changed with its setter, redraws the component.
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [url, setUrl] = useState('')

  // Re-read these values whenever the editor changes, so buttons light up correctly.
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
      heading: ctx.editor.isActive('heading', { level: 1 })
        ? '1'
        : ctx.editor.isActive('heading', { level: 2 })
          ? '2'
          : ctx.editor.isActive('heading', { level: 3 })
            ? '3'
            : 'p',
      bulletList: ctx.editor.isActive('bulletList'),
      orderedList: ctx.editor.isActive('orderedList'),
      blockquote: ctx.editor.isActive('blockquote'),
      bold: ctx.editor.isActive('bold'),
      italic: ctx.editor.isActive('italic'),
      strike: ctx.editor.isActive('strike'),
      underline: ctx.editor.isActive('underline'),
      highlight: ctx.editor.isActive('highlight'),
      link: ctx.editor.isActive('link'),
      alignLeft: ctx.editor.isActive({ textAlign: 'left' }),
      alignCenter: ctx.editor.isActive({ textAlign: 'center' }),
      alignRight: ctx.editor.isActive({ textAlign: 'right' }),
      alignJustify: ctx.editor.isActive({ textAlign: 'justify' })
    })
  })

  // Heading dropdown: "p" = normal paragraph, "1"-"3" = heading level.
  function setHeading(value: string): void {
    if (value === 'p') {
      editor.chain().focus().setParagraph().run()
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number(value) as 1 | 2 | 3 })
        .run()
    }
  }

  // Link button: open the small URL box, pre-filled with the current link (if any).
  function openLinkInput(): void {
    setUrl(editor.getAttributes('link').href || '')
    setShowLinkInput(true)
  }

  // Apply the typed URL to the selected text. Empty URL = remove the link.
  function applyLink(): void {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
    setShowLinkInput(false)
  }

  return (
    <div className="editor-toolbar">
      <ToolbarButton
        title="Undo"
        disabled={!state.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Redo"
        disabled={!state.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 size={16} />
      </ToolbarButton>

      <Divider />

      <select
        className="tb-select"
        value={state.heading}
        onChange={(e) => setHeading(e.target.value)}
      >
        <option value="p">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      <Divider />

      <ToolbarButton
        title="Bullet list"
        active={state.bulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Numbered list"
        active={state.orderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Quote"
        active={state.blockquote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <TextQuote size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Bold"
        active={state.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        active={state.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Strikethrough"
        active={state.strike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Underline"
        active={state.underline}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Highlight"
        active={state.highlight}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter size={16} />
      </ToolbarButton>
      <ToolbarButton title="Link" active={state.link || showLinkInput} onClick={openLinkInput}>
        <Link size={16} />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Align left"
        active={state.alignLeft}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <TextAlignStart size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Align center"
        active={state.alignCenter}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <TextAlignCenter size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Align right"
        active={state.alignRight}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <TextAlignEnd size={16} />
      </ToolbarButton>
      <ToolbarButton
        title="Justify"
        active={state.alignJustify}
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
      >
        <TextAlignJustify size={16} />
      </ToolbarButton>

      {/* The URL box only appears after clicking the Link button. */}
      {showLinkInput && (
        <>
          <Divider />
          <input
            className="tb-link-input"
            autoFocus
            placeholder="Paste a link..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyLink()
              if (e.key === 'Escape') setShowLinkInput(false)
            }}
          />
          <ToolbarButton title="Apply link" onClick={applyLink}>
            <Check size={16} />
          </ToolbarButton>
        </>
      )}
    </div>
  )
}

export default EditorToolbar
