import React from "react";
import { render } from "@testing-library/react";

const Footer = () => {
  return (
    <>
      <footer className="footerWrap">
        <div className="d-flex p-3 justify-content-center">
          <div className="footImg">
            <a href="#">
              <img src="images/press-img-3161693e.png" alt="" />
            </a>
            <a href="">
              <img src="images/cakeresume-8938f367.png" alt="" />
              找工作
            </a>
          </div>
          <div className="contactWrap">
            <ul className="footLink d-flex font-color">
              <li>
                <a className="font-color" href="">
                  關於五倍紅寶石
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  媒體報導
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  團隊成員
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  聯絡詢價
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  常見問題
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  工作機會
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  開源專案
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  隱私權條款
                </a>
              </li>
              <li>
                <a className="font-color" href="">
                  服務條款
                </a>
              </li>
            </ul>
            <div className="contactInfo d-flex">
              <div className="contactInfoLeft mr-5">
                <h6 className="font-color">
                  <strong>02-2331-5247</strong>
                </h6>
                <p>Mon-Fri/09:30-22:00</p>
              </div>
              <div className="contactInfoRight">
                <p>有任何問題嗎?</p>
                <p>hi@5xruby.tw</p>
                <a href="">地址:10046台北市中正區衡陽路7號5樓</a>
              </div>
            </div>
          </div>
        </div>
        <p className="copyright">
          {" "}
          &copy;2014-2020五倍紅寶石股份有限公司(5XRUBY CO.LTD)
          <br />
          台北市短期補習班立案 第7594號
        </p>
      </footer>
    </>
  );
};

export default Footer;
