import React, { Component } from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Footer from './Footer';
import '../Contacts.css';

Modal.setAppElement('#root');

const formRef = React.createRef();

class Contacts extends Component {
  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }

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

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const {
      modalIsOpen,
      name,
      email,
      phone,
      subject,
      message,
    } = this.state;
    return (
      <>
        <Navbar />
        <div className="banner">
          <h5 className="breadcreamb">首頁 &gt; 聯絡我們</h5>
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
            <div className="map" />
          </div>
          <div className="contactRight pt-2">
            <p>任何問題都歡迎您透過以下表單詢問，我們會盡快回覆您！</p>
            <form ref={formRef}>
              <input
                placeholder="名字"
                required
                onChange={this.setname}
              />
              <input
                type="email"
                placeholder="信箱"
                required
                onChange={this.setemail}
              />
              <input
                type="number"
                placeholder="電話"
                required
                onChange={this.setphone}
              />
              <select onChange={this.setsubject}>
                <option defaultValue="selected">請選擇主題</option>
                <option>專案開發</option>
                <option>技術諮詢</option>
                <option>企業內訓</option>
              </select>
              <textarea
                placeholder="請留下你的訊息"
                onChange={this.setmessage}
              />
              {/* 我不是機器人驗證 */}
              <button type="submit" onClick={this.showModal} className="contactbtn">
                送出
              </button>
            </form>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={this.closeModal}
              style={this.customStyles}
              contentLabel="Example Modal"
            >
              <form>
                <input
                  placeholder="名字"
                  disabled
                  defaultValue={name}
                />
                <input
                  type="email"
                  placeholder="信箱"
                  disabled
                  defaultValue={email}
                />
                <input
                  type="number"
                  placeholder="電話"
                  disabled
                  defaultValue={phone}
                />
                <select disabled>
                  <option>{subject}</option>
                </select>
                <textarea
                  placeholder="請留下你的訊息"
                  defaultValue={message}
                />
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
