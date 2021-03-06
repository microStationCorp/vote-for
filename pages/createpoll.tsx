import React, { SyntheticEvent, useEffect, useState } from "react";
import Head from "next/head";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";
import { CreatePollFormValidation } from "@/utils/validation";

export default function CreatePoll() {
  const [subject, setSubject] = useState("");
  const [nominationCounter, setNominationCounter] = useState<number>(2);
  const [nominations, setNominations] = useState<{ nomination: string }[]>([
    { nomination: "" },
    { nomination: "" },
  ]);
  const [isDisable, setDisable] = useState<boolean>(true);

  //snackbar related states
  const [open, setOpen] = useState(false);
  const [alertMsg, setMsg] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

  const handleClose = (
    event: Event | SyntheticEvent<Element>,
    reason?: any
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // count the total nominations
  useEffect(() => {
    if (nominationCounter < 3) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [nominationCounter]);

  // for saving nomination name
  const handleOnChange = (
    indx: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let data = [...nominations];
    data[indx] = { nomination: event.target.value };
    setNominations(data);
  };

  // submit form
  const handleOnSubmit = () => {
    // here will go the form validation process
    const { error, value } = CreatePollFormValidation({
      subject,
      nominations,
      totalNominations: nominationCounter,
    });

    console.log({ error, value });

    //here goes the api call
    if (!error) {
      fetch("/api/newpoll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((res) => {
          res.json().then((data) => {
            console.log(data);
            if (data.success) {
              setSubject("");
              setNominationCounter(2);
              setNominations([{ nomination: "" }, { nomination: "" }]);

              setMsg("new poll creeted");
              setAlertType("success");
              setOpen(true);
            } else {
              setMsg("error occurred. success false");
              setAlertType("error");
              setOpen(true);
            }
          });
        })
        .catch((err) => {
          console.log("failed to upload");
        });
    } else {
      setMsg(error.details[0].message);
      setAlertType("error");
      setOpen(true);
      console.error("error:", error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Create Poll</title>
        <meta name="description" content="create poll for vote for page" />
        <link rel="icon" href="/custom.svg" />
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
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
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
