function TruckLogo() {
  return (
    <div
      className="duck-truck-label"
      style={{
        fontSize: 13,
        height: 35,
        lineHeight: 1,
        marginLeft: 83,
        marginTop: 41,
        position: "absolute",
        width: 105,
        zIndex: 5,
      }}
    >
      <div className="p-0 m-0" style={{ top: 5 }}>
        <img alt="" src="/ducktruck-logo.png" width="95px" />
      </div>
    </div>
  );
}

export default TruckLogo;
