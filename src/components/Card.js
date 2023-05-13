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
          <div className="ticket-container">
            <div className="ticket__content">
              {/* <h4 className="ticket__movie-title">Blade Runner 2049</h4> */}
              <p className="ticket__movie-slogan">{item.title}</p>
              {star ? (
                <span onClick={() => addToFavourite(false)}>
                 ADDED <AiFillStar size={25} />
                </span>
              ) : (
                <span onClick={() => addToFavourite(true)}>
                 ADD <AiOutlineStar size={25} />
                </span>
              )}
              {/* <p className="ticket__current-price">$28.00</p>
					<p className="ticket__old-price">$44.99</p>
					<button className="ticket__buy-btn">Buy now</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
