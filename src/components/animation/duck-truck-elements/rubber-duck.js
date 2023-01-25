function RubberDuck() {
  return (
    <div
      className="animated-duck"
      style={{
        position: "absolute",
        marginLeft: 100,
        marginTop: 0,
        zIndex: -1,
      }}
    >
      <img alt="" src="/duck.png" width="50px" />
    </div>
  );
}

export default RubberDuck;
