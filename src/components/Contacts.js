import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Contacts.css";
class Contacts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <>
        <Navbar />
        <div className="banner">
          <h5 className="breadcreamb">首頁>聯絡我們</h5>
          <h2 className="contactTitle">有任何問題嗎?馬上連絡我們!</h2>
        </div>
        <section className="container contactMsg">
          <div className="contactLeft pt-2">
            <h2>五倍紅寶石股份有限公司</h2>
            <p>10046 台北市中正區衡陽路 7 號 5 樓</p>
            <div className="row m-0">
              <div className="col-6 p-0">
                <p>Tel：02-2331-5247</p>
                <p>Mobile：0928-617-687</p>
                <p>E-mail：hi@5xruby.tw</p>
              </div>
              <div className="col-6 p-0">
                <p>Fax：02-2331-8717</p>
                <p>統編：24536806</p>
              </div>
            </div>
            <div className="map"></div>
          </div>
          <div className="contactRight pt-2">
            <p>任何問題都歡迎您透過以下表單詢問，我們會盡快回覆您！</p>
            <form>
              <input placeholder="名字" required></input>
              <input type="email" placeholder="信箱" required></input>
              <input type="number" placeholder="電話" required></input>
              <select>
                <option defaultValue="selected">請選擇主題</option>
                <option>專案開發</option>
                <option>技術諮詢</option>
                <option>企業內訓</option>
              </select>
              <textarea placeholder="請留下你的訊息"></textarea>
              {/* 我不是機器人驗證 */}
              <button type="submit" className="contactbtn">
                送出
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Contacts;
