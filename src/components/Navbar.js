import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

let show = () => {
  $("#mobilenav").slideToggle();
};
const Navbar = () => {
  let body = document.querySelector("body");
  window.addEventListener("resize", function() {
    if (body.offsetWidth > 991) {
      $("#mobilenav").hide();
    }
  });

  return (
    <>
      <header className="header container-fluid">
        <div className="logo">
          <img src="images/logo-c473f739.png" alt="五倍紅寶石logo" />
        </div>
        <ul className="mynav row pl-0">
          <li className="col ">
            <Link to="/onlineLesson">線上課程</Link>{" "}
          </li>
          <li className="col">
            <Link to="/camping">
              ASTRO Camp
              <span id="tagEvent"> 報名優惠中</span>
            </Link>
          </li>
          <li className="col ">
            {" "}
            <Link to="/quickstartLesson">短期課程</Link>
          </li>
          <li className="col ">
            <Link to="/projectDev">專案開發</Link>
          </li>
          <li className="col ">
            <Link to="componyTrain">企業代訓</Link>
          </li>
          <li className="col ">
            <Link to="buySpace">空間租借</Link>
          </li>
          <li className="col ">
            <Link to="news">最新消息</Link>
          </li>
        </ul>
        <div id="burger" onClick={() => show()}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </header>
      <nav className="container-fluid">
        <ul id="mobilenav" className="pl-0">
          <li>
            <Link to="/onlineLesson">線上課程</Link>{" "}
          </li>
          <li>
            <Link to="/camping">
              ASTRO Camp>
              <span id="tagEvent"> 報名優惠中</span>
            </Link>
          </li>
          <li>
            <Link to="/quickstartLesson">短期課程</Link>
          </li>
          <li>
            <Link to="/projectDev">專案開發</Link>
          </li>
          <li>
            <Link to="componyTrain">企業代訓</Link>
          </li>
          <li>
            <Link to="buySpace">空間租借</Link>
          </li>
          <li>
            <Link to="news">最新消息</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
