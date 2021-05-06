import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    width: 100,
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Coacheso
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          What activity do you want coaching for?
        </Typography>
        <Box m={2}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="filled-basic" label="Enter your activity" />
          </form>
        </Box>
      </Box>
    </Container>
  );
}
