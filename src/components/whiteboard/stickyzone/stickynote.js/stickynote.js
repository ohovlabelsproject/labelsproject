function StickyNote(props) {
  return (
    <div
      className="stickynote"
      onTouchMove={(e) => {
        const touchLocation = e.targetTouches[0];
        alert(touchLocation);
      }}
    >
      {props.label}
      <div className="stickynote-test-data-wrapper">
        Label: {props.index + 1}
      </div>
    </div>
  );
}
export default StickyNote;
