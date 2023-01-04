import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getMatchDetails } from "../api/Api";

const MyCard = ({ match }) => {
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState("");

  const handleClick = (id) => {
    getMatchDetails(match.id)
      .then((matchdata) => setDetail(matchdata.data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    let temp = "";

    if (detail && detail.teams) {
      temp += String(detail.teams[0]).replace("\t", " ") + " ";
      if (detail.score) {
        if (detail.score[0]) {
          temp +=
            detail.score[0].r +
            "/" +
            detail.score[0].w +
            "(" +
            detail.score[0].o +
            ")\n";
        }
        temp += String(detail.teams[1]).replace("\t", " ") + " ";
        if (detail.score[1]) {
          temp +=
            detail.score[1].r +
            "/" +
            detail.score[1].w +
            "(" +
            detail.score[1].o +
            ")";
        } else {
          temp += "Yet to bat";
        }
      }
      handleOpen();
    }
    setScore(temp);
    console.log("Score " + temp);
  }, [detail, score]);

  const checkMatchStatus = () => {
    if (detail.matchStarted) {
      return "Match Started";
    }

    if (detail.matchEnded) {
      return "Match Ended";
    }

    return "Match not yet started";
  };

  const GetDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Match-Detail...</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>{detail.name}</Typography>
            <Typography>
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {checkMatchStatus()}
              </span>
            </Typography>
            <Typography>
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {detail.status}
              </span>
            </Typography>

            <Typography>
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
                {score}
              </span>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus></Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Card style={{ marginTop: 20 }}>
        <CardContent>
          <Grid
            container
            justifyContent="center"
            spacing={5}
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h5">{match.teamInfo[0].name}</Typography>
            </Grid>
            <Grid item>
              <img
                style={{ width: 85 }}
                src={require("../img/vs.png")}
                alt="VS Image"
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{match.teamInfo[1].name}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 10 }}
                onClick={() => {
                  handleClick(match.id);
                }}
              >
                Show Detail
              </Button>
              <Button variant="contained" color="primary">
                Start Time {new Date(match.dateTimeGMT).toLocaleString()}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <GetDialog />
    </React.Fragment>
  );
};

export default MyCard;
