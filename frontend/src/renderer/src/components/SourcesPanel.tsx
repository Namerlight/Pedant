// Left panel: a heading plus a list of sources.
import SourceItem from './SourceItem'
import PanelHeader from './PanelHeader'

// Sample data for now. Later this will come from the user / backend.
const sources = [
  'https://memory-alpha.fandom.com/wiki/Portal:Main',
  'https://www.st-minutiae.com/resources/scripts/twok.txt',
  'The Two Towers, Being the Second Part of the Lord of the Rings'
]

function SourcesPanel(): React.JSX.Element {
  return (
    <div className="panel sources-panel">
      <PanelHeader title="Sources" count={sources.length} badgeColor="var(--accent-2)" showAdd />
      {/* panel-body is the part that scrolls; the header stays put. */}
      <div className="panel-body">
        {/* .map turns each string into a <SourceItem>. React needs a unique "key" for list items. */}
        {sources.map((s) => (
          <SourceItem key={s} text={s} />
        ))}
      </div>
    </div>
  )
}

export default SourcesPanel
