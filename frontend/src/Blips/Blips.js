import React, { useState, useEffect } from "react";
import Blip from "./Blip/Blip";
import "./Blips.css";
import axios from "../axios/axios";
import Navbar from "../components/Navbar/Navbar";
import Aux from "../auxilliary/Auxilliary";

const Blips = (props) => {

  const [blips, setBlips] = useState([]);
  const [error, setError] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  let config;
  if(currentUser) {
    config = {
    headers: {
      'x-access-token': currentUser.accessToken
    }
  }
  } 

  useEffect(() => {
    axios
      .get("/blips")
      .then((response) => {
        // const blips = response.data;
        setBlips(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  const removeBlip = (blipRemoved) => {
    console.log(blipRemoved.description);
    axios
      .delete("/blips/" + blipRemoved._id, config)
      .then((deleted) => {
        console.log(deleted.data);
        console.log(deleted);
        axios.get("/blips").then((response) => {
          const blips = response.data;
          console.log(blips);
          const updateBlips = blips.map((blip) => {
            return {
              ...blip,
            };
          });
          setBlips(updateBlips);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const postSelectedHandler = (_id) => {
  //   props.history.push({ pathname: "/blips/view/" + _id });
  // };

  const addSelectedHandler = (_id) => {
    props.history.push({ pathname: "/blips/new" });
  };

  let Blips = <p style={{ textAlign: "center" }}>Something went wrong</p>;
  if (!error) {
    Blips = blips.map((blip, index) => {
      return (
        <div className="blip" key={index}>
          <Blip
            onRemoveBlip={removeBlip}
            _id={blip._id}
            name={blip.name}
            quadrant={blip.quadrant}
            ring={blip.ring}
            description={blip.description}
            blip={blip}
          />{" "}
        </div>
      );
    });
  }
  return (
    <Aux>
      {currentUser ? (
        <div>
          <Navbar clicked={() => addSelectedHandler()} title="Add blip" />
          <div className="container">{Blips}</div>
        </div>
      ) : (
        <h1>Ups...you don't have access!</h1>
      )}
    </Aux>
  );
};

export default Blips;