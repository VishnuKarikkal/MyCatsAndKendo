import { Link } from "react-router-dom";
import "../../App.css";
import pawImg from "../../assets/pawprint.png";
import moreImg from "../../assets/more.png";

const NavBar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <Link className="navbar-link" to={"/"}>
          <h3 className="navbar-title">
            <span className="material-symbols-outlined navbar-title-icon">
              <img src={pawImg} alt="lgo" width={40} />
            </span>
            <div className="navbar-title-text">Cats</div>
          </h3>
        </Link>

        <div className="navbar-right-part">
          <div className="navbar-links">
            <Link className="navbar-link" to={"/moreInfo"}>
              <span className="material-symbols-outlined navbar-icons">
                <img src={moreImg} alt="lgo" width={40} />
              </span>
              <div className="navbar-option">More</div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
