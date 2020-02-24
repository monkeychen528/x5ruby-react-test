/** @jsx jsx */
import React, {
  useEffect, useState, useCallback,
} from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import '../mainNav.css';

const show = () => {
  $('#mobilenav').slideToggle();
};

const Navbar = (props) => {
  const [toggleslide, setToggleslide] = useState(true);
  const [headpage, setHeadpage] = useState('');

  const { page } = props;
  const body = document.querySelector('body');
  window.addEventListener('resize', () => {
    if (body.offsetWidth > 991) {
      $('#mobilenav').hide();
    }
  });
  // Navbar在不同頁面時更換樣式
  const MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  position: ${() => (page === 'map' ? 'relative' : 'fixed')};
  top: 0;
  width:100%;
  background: rgb(112, 57, 5);
  z-index: 3;
  transition: 1s;
  animation:${() => (page === 'map' ? 'toggleslide 3s forwards' : '')};
}
`;

  const Header = css`
    background: transparent;
    position: fixed;
    top: 0;
    z-index: 1001;
    width: 100%;
    height: 70px;
      &:hover { 
        #header{
        animation:'slidedown 1s both';
      } 
    }
    `;

  // 在地圖的頁面時
  // 決定是否跑動畫
  const slideAnimate = () => {
    if (toggleslide) {
      $('#header').removeClass('short');
      $('.mynav').css({ display: '' });
    } else {
      $('#header').addClass('short');
      $('.mynav').css({ display: 'none' });
    }
  };

  const scrollfn = useCallback(() => {
    const header = document.querySelector('#header');
    // console.log(header.className);
    if ($(window).scrollTop() > header.clientHeight) {
      setToggleslide(false);
      setHeadpage(header.className);
    } else if ($(window).scrollTop() < $('#header').height()) {
      setToggleslide(true);
      setHeadpage(header.className);
    }
    slideAnimate();
  }, [toggleslide]);
  useEffect(() => {
    window.addEventListener('scroll', scrollfn);
    return () => window.removeEventListener('scroll', scrollfn);
  });

  return (
    <>
      <header css={page === 'map' ? css`
          ${Header}
          ` : ''}
      >
        <MainNav id="header">
          <div className="logo">
            <img src="./images/logo.svg" alt="ramenLogo" />
          </div>
          <div className="mynav pl-0">
            <li>
              <Link to="/ramenMap">
                拉麵地圖
                <span id="tagEvent"> 新功能</span>
              </Link>
            </li>
            <li>
              <Link to="/contacts">聯絡我們</Link>
            </li>
          </div>
          <div id="burger" onClick={() => show()} role="presentation">
            <div className="line" />
            <div className="line" />
            <div className="line" />
          </div>
        </MainNav>
      </header>
      <nav className="container-fluid">
        <ul id="mobilenav" className="pl-0">
          <li className="col">
            <Link to="/ramenMap">
              拉麵地圖
              <span id="tagEvent"> 新功能</span>
            </Link>
          </li>
          <li className="col ">
            <Link to="/contacts">聯絡我們</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
