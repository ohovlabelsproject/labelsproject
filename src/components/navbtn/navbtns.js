import NavBtnL from "./navbtnl";
import NavBtnR from "./navbtnr";

function NavBtns(props) {
  const { handleNavClick, labelsData, labelsMetadata } = props;
  return (
    <>
      <NavBtnL
        handleNavClick={handleNavClick}
        labelsMetadata={labelsMetadata}
      />
      <NavBtnR
        handleNavClick={handleNavClick}
        labelsData={labelsData}
        labelsMetadata={labelsMetadata}
      />
    </>
  );
}

export default NavBtns;
