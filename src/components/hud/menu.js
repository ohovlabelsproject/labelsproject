function Menu(props) {
  return (
    <div
      className="menu-wrapper"
      style={{
        display: props.menuExpansion.expanded ? "block" : "none",
        borderRadius: 5,
        background: props.menuExpansion.expanded
          ? "rgba(0, 0, 0, 0.1)"
          : "none",
      }}
    >
      <button className="form-control">Instructions</button>
      <button className="form-control">Resources</button>
      <button
        className="form-control"
        onClick={() => {
          window.confirm(
            "You will be taken away from this page. Are you sure?"
          );
        }}
      >
        Results
      </button>
      <button
        className="form-control"
        onClick={() => {
          props.setShowAttributions(true);
          props.setMenuExpansion((previousState) => {
            return {
              ...previousState,
              expanded: !props.menuExpansion.expanded,
            };
          });
        }}
      >
        Attributions
      </button>
      <button className="form-control">Contact Us</button>
    </div>
  );
}

export default Menu;