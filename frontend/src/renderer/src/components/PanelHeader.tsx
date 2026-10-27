// Small uppercase heading at the top of a side panel, e.g. "SOURCES (3)  +".
// Usage: <PanelHeader title="Sources" count={3} badgeColor="var(--accent-2)" showAdd />
import { Plus } from 'lucide-react'

type Props = {
  title: string
  count?: number // number shown in a small colored badge (optional)
  badgeColor?: string // badge color; defaults to the theme's main accent
  showAdd?: boolean // show the "+" button
}

function PanelHeader(props: Props): React.JSX.Element {
  const color = props.badgeColor || 'var(--accent)'

  return (
    <div className="panel-header">
      <span className="panel-title">
        {props.title}
        {/* "!== undefined" so a count of 0 still shows. */}
        {props.count !== undefined && (
          <span
            className="panel-badge"
            style={{
              color: color,
              backgroundColor: `color-mix(in srgb, ${color} 20%, transparent)`
            }}
          >
            {props.count}
          </span>
        )}
      </span>
      {/* "&&" = only draw the button when showAdd is true. Does nothing yet. */}
      {props.showAdd && (
        <button className="panel-header-button" title={'Add to ' + props.title}>
          <Plus size={15} />
        </button>
      )}
    </div>
  )
}

export default PanelHeader
