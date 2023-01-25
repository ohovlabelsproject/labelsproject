import uiLabels from "../../uiLabels";

function Footer() {
  return (
    <footer className="footer">
      <small>
        &copy; {new Date().getFullYear()} {uiLabels.footer}
      </small>
    </footer>
  );
}

export default Footer;
