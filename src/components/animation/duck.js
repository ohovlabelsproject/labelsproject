function Duck() {
  return (
    <div id="duck" className="duck" style={{ color: "#fff", display: "none" }}>
      <div
        className="animated-duck"
        style={{
          position: "absolute",
          marginLeft: 100,
          marginTop: 0,
          zIndex: -1,
        }}
      >
        <img src="/duck.png" width="50px" />
      </div>

      {/*
      <div
        className=""
        style={{
          position: "absolute",
          marginLeft: 145,
          marginTop: 0,
          zIndex: -1,
          filter: "hue-rotate(40deg)",
        }}
      >
        <img src="/duck.png" width="50px" />
      </div> */}
      <div className="">
        <img src="/ducktruck.png" />
      </div>
    </div>
  );
}

export default Duck;
