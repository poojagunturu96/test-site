import React from "react";
import MiddLogo from "../images/midd-shield.svg";

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header__wrap app-header__wrap--main">
        <div className="app-header__logo">
          <a href="">
            <img
              src={MiddLogo}
              // srcset="images/midd-shield.svg 67w"
              sizes="(min-width: 1024px) 67px, 44px"
              alt="Middlebury Shield"
            />
          </a>
        </div>

        <h1 className="app-header__title" id="midd-app-header-label">
          <a href="/" className="app-header__link">
            Middlebury Handbook
          </a>
        </h1>
      </div>
    </header>
  );
};

export default Header;
