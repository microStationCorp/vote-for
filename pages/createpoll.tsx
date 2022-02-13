import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CreatePoll() {
  const [subject, setSubject] = useState("");
  const [nominationCounter, setNominationCounter] = useState<number>(2);
  const [nominations, setNominations] = useState<{ nomination: string }[]>([
    { nomination: "" },
    { nomination: "" },
  ]);
  const [isDisable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (nominationCounter < 3) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [nominationCounter]);

  const handleOnChange = (
    indx: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let data = [...nominations];
    data[indx] = { nomination: event.target.value };
    setNominations(data);
  };

  const handleOnSubmit = () => {
    fetch("/api/newpoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, nominationCounter, nominations }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log("failed to upload");
      });
  };

  return (
    <>
      <Head>
        <title>Create Poll</title>
        <meta name="description" content="create poll for vote for page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container gap={2} alignItems="center" justifyContent={"center"}>
          <Grid item xs={10} sm={6}>
            <TextField
              fullWidth
              rows={4}
              id="outlined-textarea"
              label="Subject for Vote"
              multiline
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Grid>
          <Grid item xs={11} sm={6} textAlign={"center"}>
            <Typography variant="h6" component={"span"}>
              Please provide number of nominations:
            </Typography>
            <Paper sx={{ display: "inline-block", width: "150px", ml: 2 }}>
              <Grid
                container
                justifyContent={"space-between"}
                alignItems="center"
              >
                <Grid item>
                  <IconButton
                    aria-label="decrease"
                    color="primary"
                    onClick={() => {
                      let data = [...nominations];
                      data.splice(data.length - 1, 1);
                      setNominations([...data]);
                      setNominationCounter(nominationCounter - 1);
                    }}
                    disabled={isDisable}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <Grid item>{nominationCounter}</Grid>
                <Grid item>
                  <IconButton
                    aria-label="increase"
                    color="primary"
                    onClick={() => {
                      let newNomination: { nomination: string } = {
                        nomination: "",
                      };
                      setNominations([...nominations, newNomination]);
                      setNominationCounter(nominationCounter + 1);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={10} sm={6} textAlign="center">
            <Grid container direction={"column"} gap={1}>
              {nominations.map((nom: { nomination: string }, indx: number) => (
                <Grid item key={indx}>
                  <TextField
                    size="small"
                    label={`Nomination ${indx + 1}`}
                    name="nomination"
                    value={nom.nomination}
                    onChange={(event) => handleOnChange(indx, event)}
                  />
                  <IconButton
                    aria-label="remove"
                    color="error"
                    onClick={() => {
                      let data = [...nominations];
                      data.splice(indx, 1);
                      setNominations([...data]);
                      setNominationCounter(nominationCounter - 1);
                    }}
                    disabled={isDisable}
                  >
                    <CancelIcon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={10} sm={6} textAlign="center">
            <Button
              // fullWidth
              variant="contained"
              onClick={() => handleOnSubmit()}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

function CounterComp() {
  return (
    <>
      <Paper sx={{ mx: 2 }}>Counter</Paper>
    </>
  );
}
