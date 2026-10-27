// The whole page: custom title bar on top, three panels side by side below it.
import TitleBar from './components/TitleBar'
import SourcesPanel from './components/SourcesPanel'
import EditorPanel from './components/EditorPanel'
import FeedbackPanel from './components/FeedbackPanel'

function App(): React.JSX.Element {
  return (
    <div className="app">
      <TitleBar />
      <div className="panels">
        <SourcesPanel />
        <EditorPanel />
        <FeedbackPanel />
      </div>
    </div>
  )
}

export default App
