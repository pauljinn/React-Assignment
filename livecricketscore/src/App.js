import "./App.css";
import { Button, Grid, Typography } from "@material-ui/core";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Typography variant="h3" style={{ marginTop: 20 }}>
        Live Cricket Score
      </Typography>
      <Home/>
    </div>
  );
}

export default App;
