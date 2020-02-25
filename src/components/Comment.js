import React, { useState, useEffect } from 'react';
import websocket from 'socket.io-client';
import Navbar from './Navbar';

const Comment = () => {
  const [ws, setWs] = useState(null);

  const connectWebSocket = () => {
    setWs(websocket('http://localhost:3000'));
  };
  // 監聽送回的訊息
  const initWebSocket = () => {
    ws.on('getMessage', (msg) => {
      console.log(msg);
      const showText = document.querySelector('#textBlock');
      const block = document.createElement('p');
      block.innerHTML = msg;
      showText.append(block);
    });
  };

  useEffect(() => {
    if (ws) {
      console.log('success');
      console.log(ws.disconnected);
      initWebSocket();
    }
    if (ws === null) connectWebSocket();
    // return (() => {
    //   //   window.onbeforeunload = () => {
    //   //     'nbeforeunload is work';
    //   //   };
    //   ws.socket.close();
    // });
  }, [ws]);
  // 送出訊息到websocket
  const sendMessage = () => {
    const msg = document.querySelector('#msg');
    ws.emit('getMessage', msg.value);
  };

  console.log(ws);
  return (
    <>
      <Navbar />
      <div className="roomBody d-flex">
        <aside>
          <div className="roomWrap">
            <ul>
              <li className="room">房間一</li>
              <li className="room">房間二</li>
              <li className="room">房間三</li>
            </ul>
          </div>
        </aside>
        <div className="textWrap">
          <div id="textBlock">
            文字訊息
          </div>
          <input type="text" placeholder="輸入文字" id="msg" />
          <input type="button" onClick={sendMessage} value="送出" />
        </div>
      </div>
    </>
  );
};

export default Comment;
