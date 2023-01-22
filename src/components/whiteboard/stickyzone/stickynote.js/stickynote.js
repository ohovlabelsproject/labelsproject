function StickyNote(props) {
  return (
    <div className="stickynote">
      {props.label}
      <div className="stickynote-test-data-wrapper">
        Label: {props.index + 1}
      </div>
    </div>
  );
}
export default StickyNote;
