import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Contacts.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

const formRef = React.createRef();

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    };
  }
  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  setname = (e) => {
    this.setState({ name: e.target.value });
  };
  setemail = (e) => {
    this.setState({ email: e.target.value });
  };
  setphone = (e) => {
    this.setState({ phone: e.target.value });
  };
  setsubject = (e) => {
    console.log(e.target.value);
    this.setState({ subject: e.target.value });
  };
  setmessage = (e) => {
    this.setState({ message: e.target.value });
  };

  validate = () => {
    const form = formRef.current;

    return form.reportValidity();
  };
  showModal = (e) => {
    if (this.validate()) {
      e.preventDefault();
      this.setState({ modalIsOpen: true });
    }
  };
  closeModal = (e) => {
    this.setState({ modalIsOpen: false });
  };
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
            <form ref={formRef}>
              <input
                placeholder="名字"
                required
                onChange={this.setname}
              ></input>
              <input
                type="email"
                placeholder="信箱"
                required
                onChange={this.setemail}
              ></input>
              <input
                type="number"
                placeholder="電話"
                required
                onChange={this.setphone}
              ></input>
              <select onChange={this.setsubject}>
                <option defaultValue="selected">請選擇主題</option>
                <option>專案開發</option>
                <option>技術諮詢</option>
                <option>企業內訓</option>
              </select>
              <textarea
                placeholder="請留下你的訊息"
                onChange={this.setmessage}
              ></textarea>
              {/* 我不是機器人驗證 */}
              <button onClick={this.showModal} className="contactbtn">
                送出
              </button>
            </form>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={this.customStyles}
              contentLabel="Example Modal"
            >
              <form>
                <input
                  placeholder="名字"
                  disabled
                  defaultValue={this.state.name}
                ></input>
                <input
                  type="email"
                  placeholder="信箱"
                  disabled
                  defaultValue={this.state.email}
                ></input>
                <input
                  type="number"
                  placeholder="電話"
                  disabled
                  defaultValue={this.state.phone}
                ></input>
                <select disabled>
                  <option>{this.state.subject}</option>
                </select>
                <textarea
                  placeholder="請留下你的訊息"
                  defaultValue={this.state.message}
                ></textarea>
                {/* 我不是機器人驗證 */}
                <button type="submit" className="contactbtn">
                  送出
                </button>
              </form>
            </Modal>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Contacts;
