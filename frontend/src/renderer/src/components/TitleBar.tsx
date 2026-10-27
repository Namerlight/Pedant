// The slim bar across the top of the window (replaces Windows' own title bar).
// Windows still draws minimize / maximize / close on the right (see src/main/index.ts).
import { Settings } from 'lucide-react'

function TitleBar(): React.JSX.Element {
  return (
    <div className="titlebar">
      {/* Placeholder logo: just a colored square until we have a real icon. */}
      <div className="titlebar-logo" />
      <span className="titlebar-name">Pedant</span>
      {/* Does nothing yet. */}
      <button className="titlebar-button" title="Settings">
        <Settings size={15} />
      </button>
      <span className="titlebar-divider" />
      <span className="titlebar-doc">Untitled story</span>
    </div>
  )
}

export default TitleBar
