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

export default function CreatePoll() {
  const [subject, setSubject] = useState("");
  const [subjectState, setSubjectState] = useState<boolean>(false);
  const [nominationCounter, setNominationCounter] = useState<number>(2);
  const [isDisable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (nominationCounter < 3) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [nominationCounter]);

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
              disabled={subjectState}
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
                    onClick={() => setNominationCounter(nominationCounter - 1)}
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
                    onClick={() => setNominationCounter(nominationCounter + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={10} sm={6} textAlign="center">
            <Button
              // fullWidth
              variant="contained"
              onClick={() => {
                setSubjectState(!subjectState);
                console.log(subject, nominationCounter);
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
