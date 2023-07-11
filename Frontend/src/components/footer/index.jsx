import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <>
      <footer style={{ backgroundColor: "#a41e1f" }}>
        <div className="container grid2">
          <div className="box">
            <h1 style={{ color: "white" }}>exs</h1>
            <p style={{ color: "white" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.</p>
            <div className="icon d_flex">
              <div className="img d_flex">
                <i class="fa-brands fa-google-play"></i>
                <span style={{ color: "white" }}>Google Play</span>
              </div>
              <div className="img d_flex">
                <i class="fa-brands fa-app-store-ios"></i>
                <span style={{ color: "white" }}>App Store</span>
              </div>
            </div>
          </div>

          <div className="box">
            <h2 style={{ color: "white" }}>About Us</h2>
            <ul>
              <li style={{ color: "white" }}>Careers</li>
              <li style={{ color: "white" }}>Our Stores</li>
              <li style={{ color: "white" }}>Our Cares</li>
              <li style={{ color: "white" }}>Terms & Conditions</li>
              <li style={{ color: "white" }}>Privacy Policy</li>
            </ul>
          </div>
          <div className="box">
            <h2 style={{ color: "white" }}>Customer Care</h2>
            <ul>
              <li style={{ color: "white" }}>Help Center </li>
              <li style={{ color: "white" }}>How to Buy </li>
              <li style={{ color: "white" }}>Track Your Order </li>
              <li style={{ color: "white" }}>Corporate & Bulk Purchasing </li>
              <li style={{ color: "white" }}>Returns & Refunds </li>
            </ul>
          </div>
          <div className="box">
            <h2 style={{ color: "white" }}>Contact Us</h2>
            <ul>
              <li style={{ color: "white" }}>Jawa Tengah, Banyumas, Indonesia </li>
              <li style={{ color: "white" }}>Email: yusufjojo244@gmail.com</li>
              <li style={{ color: "white" }}>Phone: +62 878 3156 2908</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
