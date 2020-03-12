import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import websocket from 'socket.io-client';
import Navbar from './Navbar';
import '../asset/comment.css';

const Comment = () => {
  const [ws, setWs] = useState(null);
  const [connect, setConnect] = useState(false);
  const [room, setRoom] = useState('大廳');
  const [row, setRow] = useState(1);
  const msg = document.querySelector('#msg');

  const connectWebSocket = () => {
    if (room) setWs(websocket('http://localhost:3050', { path: room }));
    setWs(websocket('http://localhost:3050'));
    setConnect(true);
  };
  // 監聽送回的訊息
  const initWebSocket = () => {
    const showText = document.querySelector('#textBlock');
    // const 放裡面是要讓每次接收訊息時重新建新的
    ws.on('getMessage', (getMsg) => {
      // console.log(getMsg);
      const block = document.createElement('p');
      block.innerHTML = getMsg;
      showText.append(block);
    });
  };

  // 送出訊息到websocket
  const sendMessage = () => {
    // 清空textarea 恢復原本高度
    ws.emit('message',
      room ? { nowRoom: room, msg: msg.value } : msg.value);
    msg.style.height = '41px';
    msg.value = '';
  };

  // 更換房間
  const changeRoom = (e) => {
    const roomName = e.target.innerHTML;
    e.target.style.listStyle = 'unset';
    $(e.target).siblings().css('list-style', 'none');
    ws.emit('changeroom', { nowRoom: roomName });
    setRoom(roomName);
    console.log(roomName);
  };
  const disconnect = () => {
    console.log('will disconnect');
    ws.close();
  };

  // 畫面進入的時候重新連接socket
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
  // type留言的時候更改textarea高度
  // function usePrevious(value) {
  //   const originHeight = useRef();
  //   useEffect(() => {
  //     originHeight.current = value;
  //   });
  //   return originHeight.current;
  // }
  const adjustHeight = (e) => {
    const grow = Math.ceil(msg.clientHeight);
    const checkHeight = e.target.scrollHeight;
    // 拆開寫,讓grow取最大值，大於的話高等於scrollHeight不然就恢復41px
    // const getRow = Math.ceil(checkHeight / grow) + 1;
    const checkRow = Math.max(grow, checkHeight);

    // console.log(getRow);
    console.log(grow);
    console.log(checkHeight);
    // console.log(originHeight);
    // setRow(checkRow);
    // if (originHeight.current !== getRow) {
    //   originHeight.current = getRow;
    // }
    if (checkHeight >= grow) {
      msg.style.height = `${checkHeight}px`;
    } else {
      msg.style.height = `${grow - 35}px`;
    }
  };

  // console.log(originHeight.current);
  return (
    <>
      <Navbar />
      <div className="roomBody">
        <aside>
          <div className="roomWrap">
            <ul>
              <li className="room" style={{ listStyle: 'unset' }} onClick={changeRoom} role="presentation">大廳</li>
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
          <div className="typeWrap">
            <textarea placeholder="輸入文字" id="msg" onKeyDown={adjustHeight} />
            <input type="button" onClick={sendMessage} value="送出" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
