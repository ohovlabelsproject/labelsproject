function WhiteboardMsg(props) {
  return (
    <div
      style={{
        display: props.labelsMetadata.labelBeingDisposedOf ? "flex" : "none",
      }}
      className={`whiteboard-msg-wrapper animate__animated ${
        props.labelsMetadata.labelBeingDisposedOf
          ? "animate__fadeInDownBig"
          : "animate__fadeOutUpBig"
      } `}
    >
      <div className="whiteboard-msg-text-wrapper col-12 row p-0 m-0">
        <div className="col-12">
          <p className="whiteboard-msg-thanks">
            <i className="fa fa-check-square-o"></i>&nbsp;Thanks!
          </p>
        </div>
        <div className="col-12">
          <p>Well-trained ducks are disposing of it.</p>
          <p class="whiteboard-msg-parenth">
            (Goes to a digital landfill site)
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhiteboardMsg;
