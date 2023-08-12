import {Link} from "react-router-dom";
import React from "react";
import "./footer.css"
const HomeFooter = () => {
  return (
    <footer className="home-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-contact">
            <p>
              <i className="fas fa-phone-alt"></i> Phone: +1 123-456-7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> Email: info@example.com
            </p>
          </div>
          <p className="footer-company">Company Name</p>
        </div>
        <div className="footer-middle">
          <h1>DISCOVER</h1>
          <div className="footer-icons">
            <li>
              <Link to="#">Home</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Contacts</Link>
            </li>
            <li>
              <Link to="#">Features</Link>
            </li>
            <li>
              <Link to="#">Projects</Link>
            </li>
            <li>
              <Link to="#">our_company</Link>
            </li>
            <li>
              <Link to="#">Blogs</Link>
            </li>
          </div>
        </div>
        <div className="footer-middle">
          <h1>INFORMATION</h1>
          <div className="footer-icons">
            <li>
              <Link to="#">Services</Link>
            </li>
            <li>
              <Link to="#">Our Team</Link>
            </li>
            <li>
              <Link to="#">Price Item</Link>
            </li>
            <li>
              <Link to="#">Features</Link>
            </li>
            <li>
              <Link to="#">Short Codes</Link>
            </li>
            <li>
              <Link to="#">Typography</Link>
            </li>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <form>
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-copyright">
        <p>&copy; Asikur Rahman | All rights reserved</p>
        <div className="footer-middle">
          <div className="footer-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
