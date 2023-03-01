import { useState } from "react";
import Menu from "./menu";

function Hud(props) {
  const [menuExpansion, setMenuExpansion] = useState({ expanded: false });
  const { enableSound, setEnableSound } = props;
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
            onClick={() => {
              setMenuExpansion((previousState) => {
                return {
                  ...previousState,
                  expanded: false,
                };
              });
            }}
          >
            Add label &nbsp;
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="col-4">
          <a href="http://www.ohov.co.uk" rel="noreferrer" target="_blank">
            <img
              alt="Our Hearing, Our Voice logo"
              src="/img/branding/ohov-logo.png"
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
                ? "rgba(255, 255, 255, 0.7)"
                : "rgba(0, 0, 0, 0.1)",
            }}
          >
            {props.orientationData &&
            props.orientationData.w &&
            props.orientationData.w > 500
              ? "Menu "
              : null}

            {menuExpansion.expanded ? (
              <i className="fa fa-close"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
          <button
            className="btn-ohov-hud"
            onClick={() => setEnableSound(!enableSound)}
          >
            <i
              className={`fa fa-${enableSound ? "volume-up" : "volume-off"}`}
            ></i>
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
