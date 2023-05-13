import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import ClimbingBoxLoader from "react-spinners/PacmanLoader";


const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [quiery, setQuiery] = useState("");
  const [run, setRun] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [val, setVal] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [count, setCount] = useState(0);
  const [fav, setFav] = useState([])
 
  console.log(fav)

  const fetchData = () => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${quiery}&limit=${limit}&offset=${skip}&rating=g&lang=en`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(()=>{
          setIsLoading(true);
          setVal(data.data);
          setCount(data.pagination.total_count);

        },3000)
      })

      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    
    setIsLoading(true);
    fetchData();
  }, [ skip, limit, run]);

  function handle() {
    setRun(true)
  }

  if (!isLoading) {
    return (
      <ClimbingBoxLoader
        color="rgb(244, 51, 151)"
        cssOverride={{
          left: "42%",
          position: "absolute",
          textAlign: "center",
          top: "42%",
        }}
        size={45}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div>
      <div className="header">
        <div className="search">
          <input
            type="text"
            placeholder="Search your favourite GIPH"
            className="searchbar"
            value={quiery}
            onChange={ 
             (e)=> {
              setRun(false)
              setQuiery(e.target.value)
             }
              
            }
            
          />
        </div>
        <button className="bttn" onClick={handle}>Search</button>

        <div className="profile">
          <button onClick={()=>setProfile(!profile)} className="bttn">Profile</button>

          {profile && (
            <div style={{ display: "block" }}>
              <div className="profileHoverBtnContainer">
                <h3>
                  {/* Hello {localData === null ? "User" : localData.name} */}
                  hello
                </h3>
                <h5>
                  {/* {localData !== null
                        ? "Welcome to Meesho"
                        : "Access your account"} */}
                </h5>
                <button className="login_btn">
                  {/* Sign {localData !== null ? "out" : "up"} */}
                  User
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
     { val.length > 0 && <div className="card_wrapper">
        {val.length > 0 &&
          val.map((item, i) => {
            return <Card item={item} key={i} fav={fav} setFav={setFav}/>;
          })}
      </div>}

      <div className="paginationApp">
        {val.length > 0 && <Pagination count={count} setSkip={setSkip} />}
      </div>
    </div>
  );
};

export default Navbar;
