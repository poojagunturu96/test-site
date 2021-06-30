import React from "react";

const Footer = () => {
  return (
    <nav className="midd-footer" aria-labelledby="midd-footer-label">
      <h2 id="midd-footer-label" className="sr-only">
        Additional navigation
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="mb-4 mb-lg-0">
              <a href="https://www.middlebury.edu">
                <img
                  src="https://www.middlebury.edu/college/themes/custom/middlebury_theme/images/middlebury-logo-white.svg?fv=qtmpod"
                  alt="Middlebruy"
                  width="195"
                  height="71"
                />
              </a>
            </div>
          </div>
          <div className="col-lg-9">
            <ul className="midd-footer__list">
              <li className="midd-footer__item">
                <a
                  href="https://www.middlebury.edu/about"
                  className="midd-footer__link"
                >
                  About Middlebury
                </a>
              </li>
              <li className="midd-footer__item">
                <a
                  href="https://www.middlebury.edu/giving"
                  className="midd-footer__link"
                >
                  Giving
                </a>
              </li>
              <li className="midd-footer__item">
                <a
                  href="https://www.middlebury.edu/offices/business/hr/jobseeker"
                  className="midd-footer__link"
                >
                  Employment
                </a>
              </li>
              <li className="midd-footer__item">
                <a
                  href="https://www.middlebury.edu/office/"
                  className="midd-footer__link"
                >
                  Offices and Services
                </a>
              </li>
              <li className="midd-footer__item">
                <a
                  href="https://www.middlebury.edu/about/copyright"
                  className="midd-footer__link"
                >
                  Copyright
                </a>
              </li>
              <li className="midd-footer__item">
                <a
                  href="https://www.middlebury.edu/about/privacy"
                  className="midd-footer__link"
                >
                  Privacy
                </a>
              </li>
              <li className="midd-footer__item">
                <a href="/admin" className="midd-footer__link" rel="nofollow">
                  Site-Editor Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
