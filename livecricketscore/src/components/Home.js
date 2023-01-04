import MyCard from "./MyCard";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { getMatches } from "../api/Api";

const Home = () => {
  useEffect(() => {
    getMatches()
      .then((matchdata) => {
        setMatches(matchdata.data);
        console.log(matchdata);
      })
      .catch((error) => alert("Could not load data."));
  }, []);

  const [matches, setMatches] = useState([]);

  const getCurrentDate = (date) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  return (
    <Grid container>
      <Grid sm={2}></Grid>
      <Grid sm={8}>
        {matches &&
          matches.map((match) => {
            if (
              (match.matchType === "t20" || match.matchType === "odi") &&
              match.date == getCurrentDate()
            ) {
              return <MyCard match={match} key={match.id} />;
            } else {
              return null;
            }
          })}
      </Grid>
    </Grid>
  );
};

export default Home;
