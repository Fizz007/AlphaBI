import React from 'react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = () => {
  return (
    <div>
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
    
    </div>
  )
}

export default Loader
