// One feedback card in the Feedback panel: a light tint of its color with a solid left edge.
// Usage: <FeedbackCard color="var(--card-factcheck)" message="..." linkLabel="..." />
// (color can be any CSS color; theme colors come from assets/themes.css)

type Props = {
  color: string // card accent color
  message: string // the feedback text
  linkLabel: string // text on the small link "chip" at the bottom
}

function FeedbackCard(props: Props): React.JSX.Element {
  // color-mix blends 18% of the card color into transparent = a soft tint.
  const tint = `color-mix(in srgb, ${props.color} 18%, transparent)`

  return (
    // style={{ ... }} sets inline CSS from a JS object (double braces: JS value + object).
    <div className="feedback-card" style={{ backgroundColor: tint, borderLeftColor: props.color }}>
      <p>{props.message}</p>
      <span className="link-chip">{props.linkLabel}</span>
    </div>
  )
}

export default FeedbackCard
