import "./footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div id="footer">
      <div className="footerData container">
        <div>
          Developed by{" "}
          <a href="https://hesammarshal.ir">Hesam Marshal Akrami</a>
        </div>
        <div>
          <Link to="/release">Release 0.6.0</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
