import React, { Component } from 'react';
import Modal from 'react-modal';
import ReCAPTCHA from 'react-google-recaptcha';
import Navbar from './Navbar';
import Footer from './Footer';
import '../asset/contacts.css';

function onChange(value) {
  console.log('Captcha value:', value);
}

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
      message: '',
    };
  }

  componentDidMount() {
    // grecaptcha.reset();
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
      message,
    } = this.state;
    return (
      <>
        <Navbar />
        <section className="container contactMsg">
          <div className="contactLeft pt-2">
            <h2>單純吃拉麵的紀錄</h2>
            <div className="row m-0">
              <div className="col-6 p-0">
                <p>作者:陳以十</p>
                <p>
                  我的:
                  <a href="https://github.com/monkeychen528">
                    github
                  </a>
                </p>
                <p>E-mail：monkeychen528@gmail.com</p>
              </div>
            </div>
            <div className="userWrap">
              <img src="/images/author.jpg" alt="" />
            </div>
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
              <textarea
                placeholder="請留下你的訊息"
                onChange={this.setmessage}
              />
              <ReCAPTCHA
                sitekey="6LceQNoUAAAAAGh_LcEkvu43qxaCiudBleGwjUn1"
                onChange={onChange}
              />
              {/* <div className="g-recaptcha" data-sitekey="6LceQNoUAAAAAGh_LcEkvu43qxaCiudBleGwjUn1" /> */}
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
