// Right panel: a heading plus a stack of FeedbackCards.
import FeedbackCard from './FeedbackCard'
import PanelHeader from './PanelHeader'

// Sample data for now. Later this will come from the backend.
const feedback = [
  {
    color: 'var(--card-factcheck)',
    message: 'Is this correct? Episode 20 of ST: The Next Generation states "ad minim noveratis"',
    linkLabel: 'Ep20Link'
  },
  {
    color: 'var(--card-canon)',
    message:
      "You appear to be using the book canon for most of this story. In the book canon, this quote is very at odds with Faramir's characterization.",
    linkLabel: 'The Two Towers, Chapter 4'
  }
]

function FeedbackPanel(): React.JSX.Element {
  return (
    <div className="panel feedback-panel">
      <PanelHeader title="Feedback" count={feedback.length} />
      <div className="panel-body">
        {/* One card per item. "i" (the index) is used as the key since we have no ids yet. */}
        {feedback.map((f, i) => (
          <FeedbackCard key={i} color={f.color} message={f.message} linkLabel={f.linkLabel} />
        ))}
      </div>
    </div>
  )
}

export default FeedbackPanel
