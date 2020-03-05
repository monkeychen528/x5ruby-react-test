import React, { useState, useEffect } from 'react';
import websocket from 'socket.io-client';
import Navbar from './Navbar';
import '../asset/comment.css';

const Comment = () => {
  const [ws, setWs] = useState(null);
  const [connect, setConnect] = useState(false);
  const [room, setRoom] = useState('大廳');
  const msg = document.querySelector('#msg');

  const connectWebSocket = () => {
    if (room) setWs(websocket('http://localhost:3050', { path: room }));
    setWs(websocket('http://localhost:3050'));
    setConnect(true);
  };
  // 監聽送回的訊息
  const initWebSocket = () => {
    ws.on('addroom', (getMsg) => {
      console.log(getMsg);
      const showText = document.querySelector('#textBlock');
      const block = document.createElement('p');
      block.innerHTML = getMsg;
      showText.append(block);
    });

    ws.on('getMessage', (getMsg) => {
      console.log(getMsg);
      const showText = document.querySelector('#textBlock');
      const block = document.createElement('p');
      block.innerHTML = getMsg;
      showText.append(block);
    });
  };


  // 送出訊息到websocket
  const sendMessage = () => {
    // console.log(room);
    ws.emit('message',
      room ? { nowRoom: room, msg: msg.value } : msg.value);
  };
  // 更換房間
  const changeRoom = (e) => {
    const roomName = e.target.innerHTML;
    ws.emit('changeroom', { nowRoom: roomName });
    setRoom(roomName);
    console.log(roomName);
  };
  const disconnect = () => {
    console.log(123);
    ws.close();
  };

  useEffect(() => {
    if (connect) {
      console.log('success');
      // ws.emit('disconnected');
      initWebSocket();
    } else {
      connectWebSocket();
    }
    // 監聽如果離開頁面則發送disconnect
    window.addEventListener('popstate', disconnect);
    return () => {
      console.log('remove event');
      window.removeEventListener('popstate', disconnect);
    };
  }, [ws]);


  console.log(ws);
  return (
    <>
      <Navbar />
      <div className="roomBody">
        <aside>
          <div className="roomWrap">
            <ul>
              <li className="room" onClick={changeRoom} role="presentation">大廳</li>
              <li className="room" onClick={changeRoom} role="presentation">房間一</li>
              <li className="room" onClick={changeRoom} role="presentation">房間二</li>
              <li className="room" onClick={changeRoom} role="presentation">房間三</li>
            </ul>
          </div>
        </aside>
        <div>
          <div className="textWrap">
            <div id="textBlock">
              文字訊息
            </div>
          </div>
          <input type="text" placeholder="輸入文字" id="msg" />
          <input type="button" onClick={sendMessage} value="送出" />
        </div>
      </div>
    </>
  );
};

export default Comment;
