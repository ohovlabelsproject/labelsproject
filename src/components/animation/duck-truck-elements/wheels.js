function Wheels() {
  const wheels = [
    {
      name: "wheel1",
      style: { marginLeft: 15 },
    },
    {
      name: "wheel2",
      style: { marginLeft: 110 },
    },
    {
      name: "wheel2",
      style: { marginLeft: 150 },
    },
  ];
  //
  return wheels.map((wheel, index) => {
    return (
      <div
        className="animated-wheel"
        key={`wheel-${index}`}
        style={{
          height: 35,
          marginLeft: wheel.style.marginLeft,
          marginTop: 87,
          position: "absolute",
          width: 35,
          zIndex: 5,
        }}
      >
        <img alt="" src="/wheel.png" width="35px" />
      </div>
    );
  });
}

export default Wheels;
