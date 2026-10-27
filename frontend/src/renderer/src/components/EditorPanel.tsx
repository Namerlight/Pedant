// Center panel: the Tiptap rich-text editor with its toolbar on top.
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import EditorToolbar from './EditorToolbar'

// Text shown when the app opens (plain HTML).
const startingContent = `
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
`

function EditorPanel(): React.JSX.Element {
  // useEditor creates the editor once and keeps it between redraws.
  // "extensions" = the features the editor supports.
  const editor = useEditor({
    extensions: [
      // Bold, italic, headings, lists, links, undo/redo, etc.
      // openOnClick: false -> clicking a link places the cursor instead of opening it.
      StarterKit.configure({ link: { openOnClick: false } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight
    ],
    content: startingContent
  })

  return (
    <div className="panel editor-panel">
      <EditorToolbar editor={editor} />
      {/* EditorContent draws the editable text area. */}
      <EditorContent editor={editor} className="editor-body" />
    </div>
  )
}

export default EditorPanel
