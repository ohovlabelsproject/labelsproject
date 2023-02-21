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
      <button
        className="form-control"
        onClick={() => {
          window.open("/results", "_blank");
        }}
      >
        <a
          className="menu-link"
          href="/results"
          onClick={(e) => e.preventDefault()}
          rel="noreferrer"
          target="_blank"
        >
          Results
        </a>
      </button>

      <button
        className="form-control"
        onClick={() => {
          window.open(
            "https://www.ohov.co.uk/contact-us/getting-help-and-support/",
            "_blank"
          );
        }}
      >
        <a
          className="menu-link"
          href="https://www.ohov.co.uk/contact-us/getting-help-and-support/"
          onClick={(e) => e.preventDefault()}
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

      <button
        className="form-control"
        onClick={() => {
          window.open("https://www.ohov.co.uk/about-us/", "_blank");
        }}
      >
        <a
          className="menu-link"
          href="https://www.ohov.co.uk/about-us/"
          onClick={(e) => e.preventDefault()}
          rel="noreferrer"
          target="_blank"
        >
          About OHOV{" "}
        </a>
      </button>

      <button
        className="form-control"
        onClick={() => {
          window.open("https://www.ohov.co.uk/contact-us", "_blank");
        }}
      >
        <a
          className="menu-link"
          href="https://www.ohov.co.uk/contact-us/"
          onClick={(e) => e.preventDefault()}
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
