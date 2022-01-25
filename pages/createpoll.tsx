import React, { useState } from "react";
import Head from "next/head";
import { Box, Button, Grid, TextField } from "@mui/material";

export default function CreatePoll() {
  const [subject, setSubject] = useState("");

  return (
    <>
      <Head>
        <title>Create Poll</title>
        <meta name="description" content="create poll for vote for page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Grid container gap={2} alignItems="center" justifyContent={"center"}>
          <Grid item xs={11} sm={7}>
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
          <Grid item xs={3} sm={1}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => console.log(subject)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
