function StickyNote(props) {
  return (
    <div
      className="stickynote"
      id={`stickynote-${props.index}`}
      onTouchMove={(e) => {
        const touchLocation = e.targetTouches[0];

        document.getElementById(`stickynote-${props.index}`).style.position =
          "absolute";

        document.getElementById(`stickynote-${props.index}`).style.left =
          touchLocation.pageX + "px";

        document.getElementById(`stickynote-${props.index}`).style.top =
          touchLocation.pageY + "px";

        //alert(`${touchLocation.pageX}, ${touchLocation.pageY}`);
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
