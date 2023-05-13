import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Card = ({ item, setFav, fav }) => {
  const [star, setStar] = useState(false);

  function addToFavourite(isStar) {
    if(isStar === true){
        setFav([item,...fav])
        setStar(true)
    }
    else if(isStar === false){
        const filterArray = fav.filter((curr, i)=> curr.id != item.id)
        setFav(filterArray)
        setStar(false)
    }
  }
  return (
    <>
      <div className="hero-container" key={item.id}>
        <div className="main-container">
          <div className="poster-container">
            <a href="#">
              <img height="200px"
                src={item.images.original.url}
                className="poster"
              />
            </a>
          </div>
          <div className="giphy-container">
            <div className="giphy_content">
              <h6 className="giphy_title">{item.title}</h6>
              <p className="giphy_slogan">@{item.username}</p>
              <div className="add_btn">
                {star ? (
                  <span onClick={() => addToFavourite(false)} className="fav_btn">
                   ADDED <AiFillStar size={25} />
                  </span>
                ) : (
                  <span onClick={() => addToFavourite(true)} className="fav_btn">
                   ADD <AiOutlineStar size={25} />
                  </span>
                )}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
