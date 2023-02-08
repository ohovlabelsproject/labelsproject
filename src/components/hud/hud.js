import { useState } from "react";
import Menu from "./menu";

function Hud(props) {
  const [menuExpansion, setMenuExpansion] = useState({ expanded: false });
  return (
    <header className="hud">
      <div className="col-12 row">
        <div className="col-4 hud-col-l pl-1">
          <button
            aria-label="Click to add a label"
            className="btn-ohov-hud"
            data-bs-target="#modal-add-label"
            data-bs-toggle="modal"
            id="btn-ohov-1"
          >
            Add label &nbsp;
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="col-4">
          <a rel="noreferrer" href="http://www.ohov.co.uk" target="_blank">
            <img
              alt="Our Hearing, Our Voice logo"
              src="/ohov-logo.png"
              width="90px"
            />
          </a>
        </div>
        <div className="col-4 text-center hud-col-r">
          <button
            aria-label="Menu"
            className="btn-ohov-hud"
            onClick={() => {
              setMenuExpansion((previousState) => {
                return {
                  ...previousState,
                  expanded: !menuExpansion.expanded,
                };
              });
            }}
            style={{
              background: menuExpansion.expanded
                ? "rgba(0, 0, 0, 0.1)"
                : "none",
            }}
          >
            Menu{" "}
            {menuExpansion.expanded ? (
              <i className="fa fa-close"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
          <Menu
            menuExpansion={menuExpansion}
            setMenuExpansion={setMenuExpansion}
            setShowAttributions={props.setShowAttributions}
            showAttributions={props.showAttributions}
          />
        </div>
      </div>
    </header>
  );
}

export default Hud;
