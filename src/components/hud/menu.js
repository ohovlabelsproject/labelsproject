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
      <button className="form-control">
        <a
          className="menu-link"
          href="/results"
          rel="noreferrer"
          target="_blank"
        >
          Results
        </a>
      </button>

      <button className="form-control">
        <a
          className="menu-link"
          href="https://www.ohov.co.uk/contact-us/getting-help-and-support/"
          rel="noreferrer"
          target="_blank"
        >
          Resources
        </a>
      </button>

      <button
        className="form-control menu-link"
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

      <button className="form-control">
        <a
          className="menu-link"
          href="https://www.ohov.co.uk/about-us/"
          rel="noreferrer"
          target="_blank"
        >
          About OHOV{" "}
        </a>
      </button>

      <button className="form-control">
        <a
          className="menu-link"
          href="https://www.ohov.co.uk/contact-us/"
          rel="noreferrer"
          target="_blank"
        >
          Contact Us
        </a>
      </button>
    </div>
  );
}

export default Menu;
