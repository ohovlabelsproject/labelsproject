function PaperBall() {
  return (
    <div
      className="paper-ball-sm-wrapper"
      id="paper-ball-sm-wrapper"
      style={{
        position: "absolute",
        display: "none",
        top: 200,
        left: 200,
        height: "100px",
        width: "100px",
      }}
    >
      <img
        alt=""
        id="paper-ball-sm-img"
        src="/img/paper-ball/paper-ball-sm.png"
        width="100%"
      />
    </div>
  );
}

export default PaperBall;
