import RubberDuck from "./duck-truck-elements/rubber-duck";
import Truck from "./duck-truck-elements/truck";
import TruckLogo from "./duck-truck-elements/logo";
import Wheels from "./duck-truck-elements/wheels";

function Duck() {
  return (
    <div id="duck" className="duck" style={{ color: "#fff", display: "none" }}>
      <Wheels />
      <TruckLogo />
      <RubberDuck />
      <Truck />
    </div>
  );
}

export default Duck;
