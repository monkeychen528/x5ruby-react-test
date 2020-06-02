import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Article = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    if (article.length === 0) {
      try {
        fetch('https://my-json-server.typicode.com/monkeychen528/demo/article')
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setArticle(json);
          });
      } catch (error) {
        console.log(error)
      }
    }
  });
  return (
    <div className="cardwrap ">
      {article.length === 0 ? '...載入中'
        : article.map((item) => (
          <Link to="./" className="myCard" key={item.id}>
            <div className="cardCap">
              <img src={`images/${item.img}`} alt="" />
            </div>
            <div className="cardContent">
              <h5>{item.store}</h5>
              <p>
                {item.body}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Article;
