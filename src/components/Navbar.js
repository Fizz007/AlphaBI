import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { auth, provider } from "../components/FireBaseauth";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiUserCircle } from "react-icons/hi2";
import Loader from "./Loader";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [quiery, setQuiery] = useState("");
  const [run, setRun] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [val, setVal] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [count, setCount] = useState(0);
  const [fav, setFav] = useState([]);

  function fetchData() {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${quiery}&limit=${limit}&offset=${skip}&rating=g&lang=en`
    )
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setVal(data.data);
          setCount(data.pagination.total_count);
          setIsLoading(true);
        }, 1000);
      })

      .catch((err) => console.log("error", err));
  }

  useEffect(() => {
    fetchData();
  }, [skip, limit, run]);

  function handleLogIn() {
    if (!user) {
      const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
      };
      signInWithGoogle();
    } else {
      const signUserOut = async () => {
        await signOut(auth);
      };
      signUserOut();
    }
  }

  function handleByEnter(e) {
    if (e.key === "Enter") {
      setRun(true);
      setIsLoading(false)
    }
  }

  if (!isLoading) {
    return (
      <ClimbingBoxLoader
        color="black"
        cssOverride={{
          left: "42%",
          position: "absolute",
          textAlign: "center",
          top: "42%",
        }}
        size={25}
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
            onChange={(e) => {
              setRun(false);
              setQuiery(e.target.value);
            }}
            onKeyDown={handleByEnter}
          />
        </div>
        <button
          className="bttn"
          onClick={() => {
            setIsLoading(false)
            setRun(true);
          }}
        >
          Search
        </button>

        <div className="profile">
          <button onClick={handleLogIn} className="bttn">
            {user ? "LogOut" : "LogIn"}
          </button>
          <span className="user">
          
            {user ? "Welcome " + user.displayName : null}
          </span>
          <span>
            {user ? (
              <img
                src={user.photoURL}
                alt="user image"
                width="50px"
                height="50px"
              />
            ) : (
              <HiUserCircle color="white" size={50} />
            )}
          </span>
        </div>
      </div>
      {quiery !== "" ? 
        <div className="card_wrapper">
          {val.length > 0 &&
            val.map((item, i) => {
              return <Card item={item} key={i} fav={fav} setFav={setFav} />;
            })}
        </div>
      : <Loader/>}

      <div className="paginationApp">
        {val.length > 0 && <Pagination count={count} setSkip={setSkip} />}
      </div>
    </div>
  );
};

export default Navbar;
