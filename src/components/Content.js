import React, { useState, useEffect, useCallback, useRef } from "react";
import $ from "jquery";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useRouteMatch } from "react-router-dom";
const Content = () => {
  let [rwdWidth, setRwdWidth] = useState(0);
  let [num, setNum] = useState(0);
  let [stnum, setStnum] = useState(0);
  let [lesson, setLesson] = useState([]);
  let [warning, setWarning] = useState(true);

  let body = document.querySelector("body");
  let circle = document.querySelectorAll(".circle");
  let carouselImg = document.querySelectorAll(".carousel-img");

  //requst API
  useEffect(() => {
    if (warning) {
      alert("此為測試，圖像皆為五倍紅寶石授權");
      setWarning(false);
    }
    if (lesson.length === 0) {
      fetch("https://my-json-server.typicode.com/monkeychen528/demo/db")
        .then((res) => res.json())
        .then((json) => {
          setLesson(json.posts);
        });
    }
  }, [circle, lesson.length, warning]);

  // 大版面跑馬燈

  let bigCarousel = useCallback(
    (num) => {
      $(circle[num])
        .addClass("circleActive")
        .siblings()
        .removeClass("circleActive");
      $(carouselImg[num])
        .animate(
          {
            left: "0px",
            width: "100%"
          },
          0
        )
        .siblings()
        .stop(true, true)
        .animate(
          {
            left: body.offsetWidth,
            width: 0
          },
          200
        );

      $(circle[num])
        .css("background", "green")
        .siblings()
        .css("background", "rgb(144, 144, 144)");
      if (num === 3) {
        setNum(0);
      } else {
        setNum(num + 1);
      }
    },
    [body.offsetWidth, carouselImg, circle]
  );

  //   // 課程推薦跑馬燈
  let smallCarousel = useCallback(
    (stnum) => {
      let students = document.querySelectorAll(".student");
      $("#studentWrap").css("width", body.offsetWidth * students.length);
      $("#studentWrap").css("marginLeft", -stnum * window.innerWidth + "px");
      // 設定ul總長跟裡面li圖片跑的距離
      $(students[stnum])
        .css("visibility", "")
        .siblings()
        .css("visibility", "hidden");
      if (stnum === students.length) {
        $("#studentWrap").css("marginLeft", body.offsetWidth + "px");
        setTimeout(() => {
          $(students[0]).css("visibility", "");
          $("#studentWrap").css("marginLeft", 0 + "px");
        }, 500);
      }
      if (stnum === 4) {
        setStnum(0);
      } else {
        setStnum(stnum);
      }
    },
    [body.offsetWidth]
  );

  let resizeWindow = useCallback(() => {
    //  (window.innerWidth);
    setRwdWidth(window.innerWidth);
    smallCarousel(stnum);
  }, [smallCarousel, stnum]);

  let savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = { bigCarousel, smallCarousel };
  }, [bigCarousel, num, smallCarousel, stnum]);

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    // interval(num);
    function interval() {
      savedCallback.current.bigCarousel(num);
      savedCallback.current.smallCarousel(stnum + 1);
    }

    let run = setInterval(interval, 5000);
    return () => {
      window.removeEventListener("resize", resizeWindow);

      clearInterval(run);
    };
  }, [stnum, num, resizeWindow]);

  if (lesson.length === 0) return "...載入中";
  return (
    <>
      <Navbar />
      <main>
        <div className="carousel-wrap position-relative container-fluid m-0 p-0">
          <ul className="d-flex m-0 p-0">
            <li
              className="circle circleActive"
              onClick={() => bigCarousel(0)}
            ></li>
            <li
              className="circle"
              onClick={() => {
                bigCarousel(1);
              }}
            ></li>
            <li
              className="circle"
              onClick={() => {
                bigCarousel(2);
              }}
            ></li>
            <li
              className="circle"
              onClick={() => {
                bigCarousel(3);
              }}
            ></li>
          </ul>
          <div className="carousel d-flex">
            <Link to="#" className="carousel-img">
              <img src="images/banner_astro-a839be5c.jpg" alt="" />
            </Link>
            <Link to="" className="carousel-img">
              <img src="images/banner_imcodingit-53a9a811.jpg" alt="" />
            </Link>
            <Link to="" className="carousel-img">
              <img src="images/banner_mokumokukai-f9ec6b54.jpg" alt="" />
            </Link>
            <Link to="" className="carousel-img">
              <img src="images/banner_5xruby-3d66d288.jpg" alt="" />
            </Link>
          </div>
        </div>
        <section className="about">
          <h2 className="title">關於五倍紅寶石 About 5xRuby</h2>
          <div className="about container d-flex justify-content-between">
            <figure>
              <Link to="">
                <img src="images/feature-list-img1-0d20ab19.png" alt="" />
                <h4>
                  網頁設計
                  <br />
                  前後端課程教學
                </h4>
                <p>
                  帶你掌握程式技能轉職工程師，城市課程從入門到進階讓你快速上手，學員好評推薦轉職課程!
                </p>
              </Link>
            </figure>
            <figure>
              <Link to="">
                <img src="images/feature-list-img2-26e4ca80.png" alt="" />
                <h4>
                  頂尖技術
                  <br />
                  網頁製作、專案開發
                </h4>
                <p>
                  網站開發到行動裝置App工程服務、系統設計開發甚至系統架設，提供專業的建議與頂尖的技術
                </p>
              </Link>
            </figure>
            <figure>
              <Link to="">
                <img src="images/feature-list-img3-d0a4089e.png" alt="" />
                <h4>資訊軟體開發技術顧問</h4>
                <p>
                  協助您將現有人力快速打造為Ruby/Rails團隊，無須經歷繁瑣的人才招募就有即戰力!
                </p>
              </Link>
            </figure>
            <figure>
              <Link to="">
                <img src="images/feature-list-img4-13321bf0.png" alt="" />
                <h4>
                  前後端工程師
                  <br />
                  社群經營
                </h4>
                <p>
                  Ruby社群經營、舉辦各類活動，促進Ruby社群發展，歡迎前後端工程師分享交流
                </p>
              </Link>
            </figure>
          </div>
        </section>
        <div className="content container">
          <h2 className="title"> 熱門網頁設計課程推薦</h2>
          <div className="cardwrap ">
            {lesson.map((el) => {
              return (
                <Link key={el.id} to="" className="myCard">
                  <img src="images/ruby-on-rails-7c597107.jpg" alt="" />
                  <div className="cardContent">
                    <h5>{el.title}</h5>
                    <p>{el.time}</p>
                    <p className="lessoninfo">{el.info}</p>
                    講者:{el.speaker}
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="" className="lessonLink">
            看更多網頁課程
          </Link>
        </div>
      </main>
      <article>
        <section className="recommend my-5">
          <div className="recommendWrap position-relative container-fluid">
            <h2 className="title"> 網頁課程推薦</h2>
            <ul className="st-circleWrap d-flex m-0 p-0">
              <li className="st-circle" onClick={() => smallCarousel(0)}></li>
              <li className="st-circle" onClick={() => smallCarousel(1)}></li>
              <li className="st-circle" onClick={() => smallCarousel(2)}></li>
              <li className="st-circle" onClick={() => smallCarousel(3)}></li>
            </ul>
            <ul id="studentWrap" className=" d-flex">
              <li className="student d-flex">
                <div className="st-ImgWrap">
                  <img src="images/johnsie-7322ca81.jpg" alt="" />
                </div>
                <p className="recommendInfo">
                  選擇程式語言很重要，但選擇優秀的導師更重要！能跟擁有多年
                  Ruby/Rails 實戰經驗、活躍於社群的頂尖 Rubyist
                  學習，將一窺程式開發殿堂之藝術！
                  我堅信：專業事讓專業的來，而專業的「五倍紅寶石」是寶藏，就等大家來挖掘。
                  <br />
                  <strong>John Sie</strong>
                  <br />
                  Accuvally Inc.共同創辦人暨營運長
                </p>
              </li>
              <li className="student d-flex">
                <div className="st-ImgWrap">
                  <img src="images/victor-3ec52916.jpg" alt="" />
                </div>
                <p className="recommendInfo">
                  Eddie and his team are of the most dedicated Ruby evangelists
                  I have ever come across. With their passion and
                  professionalism, Ruby learners will leapfrog in their
                  progress.
                  <br />
                  <strong>Jason Hs</strong>
                  <br />
                  founder of The Big Questions & TEDxTaipei
                </p>
              </li>
              <li className="student d-flex">
                <div className="st-ImgWrap">
                  <img src="images/hana-4ae009cb.jpg" alt="" />
                </div>
                <p className="recommendInfo">
                  慕凡和龍哥是業界數一數二的 Ruby
                  大師，他們不光是底子深厚，也很懂得引導、訓練學習路上遇到挫折的
                  Ruby/Rails 學子。很慶幸有他們的協助讓我進入紅寶石的美妙世界。
                  <br />
                  <strong>Hana Chang</strong>
                  <br />
                  Co-Founder and CEO of BountyHunter
                </p>
              </li>
              <li className="student d-flex">
                <div className="st-ImgWrap">
                  <img src="images/jason-e7e95cad.jpg" alt="" />
                </div>
                <p className="recommendInfo">
                  選擇程式語言很重要，但選擇優秀的導師更重要！能跟擁有多年
                  Ruby/Rails 實戰經驗、活躍於社群的頂尖 Rubyist
                  學習，將一窺程式開發殿堂之藝術！
                  我堅信：專業事讓專業的來，而專業的「五倍紅寶石」是寶藏，就等大家來挖掘。
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section className="container">
          <h2 className="title"> 案例作品Showcase</h2>
          <div className=" d-flex justify-content-between">
            <div className="cardwrap ">
              <Link to="" className="myCard">
                <img src="images/space_next_door-4dfdfeb6.png" alt="" />
                <div className="cardContent">
                  <h5>跨境電商shopastic</h5>
                  <p>
                    Shopmatic manages the entire ecosystem for anyone wanting to
                    sell online. We go the extra mile to ensure that we help you
                    in every step of the process to grow your business online -
                    from developing your own unique webstore, to listing you on
                    marketplaces and social channels, to providing you insights
                    on how to sell online.
                  </p>
                </div>
              </Link>
              <Link to="" className="myCard">
                <img src="images/shopmatic-92ff9dcf.jpg" alt="" />
                <div className="cardContent">
                  <h5>shopmastic</h5>
                  <p>
                    Shopmatic Go is an exciting online platform where you can
                    create a unique and comprehensive online store for your
                    business, in a matter of minutes.
                  </p>
                </div>
              </Link>
              <Link to="" className="myCard">
                <img src="images/shopmatic_go-f7b86d46.png" alt="" />
                <div className="cardContent">
                  <h5>space next door</h5>
                  <p>
                    Space Next Door is inspired by the sharing economy in which
                    we hope to encourage people to put up their unused space so
                    that users looking for personal or business storage space
                    have better options, closer to where they need it. We are
                    striving to build a trusted community marketplace for you to
                    list, discover and book the nearest and best space at
                    affordable prices.!
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <Link className="font-color" to="">
            ...更多案例
          </Link>
        </section>
      </article>
      <div className="contact container my-5">
        <h5>想更瞭解我們嗎？</h5>
        <p>
          您可以看看
          <span>
            <Link className="font-color" to="">
              常見問題
            </Link>
          </span>
          或者直接
          <span>
            <Link className="font-color" to={`/contacts`}>
              線上洽詢
            </Link>
          </span>
          ，會有親切的客服人員回答您的問題，也可以透過社群網站隨時關注我們的動態。
        </p>
        <Link to="" className="m-2">
          <img src="images/icon-fb-2f24e7a0.png" alt="臉書網址" />
        </Link>
        <Link to="" className="m-2">
          <img src="images/icon-twitter-89f8d087.png" alt="官方twitter" />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Content;
