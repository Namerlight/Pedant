// One line in the Sources panel.
// A React "component" is just a function that returns HTML-like markup (JSX).
// "props" are the arguments passed in, like <SourceItem text="..." />.

function SourceItem(props: { text: string }): React.JSX.Element {
  // {props.text} inserts a JS value into the markup.
  // In JSX we write "className" instead of "class".
  return <p className="source-item">{props.text}</p>
}

export default SourceItem
