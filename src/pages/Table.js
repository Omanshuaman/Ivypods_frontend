import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";
import List from "./List";
import { ChatState } from "../Context/ChatProvider";
import { useEffect } from "react";

import axios from "axios";
import { useState } from "react";
const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
});
const Table = () => {
  const classes = useStyles();
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });
  const [status, setStatus] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const { user } = ChatState();
  const [pins, setPins] = useState([]);
  const { details, setDetails } = ChatState();

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "https://ivypodsbackend.up.railway.app/api/todo/organize",
        config
      );

      setDetails(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchChats();
  }, [details]);
  async function onFormSubmit(e) {
    e.preventDefault();
    const newPin = {
      Name: name,
      PhoneNumber: phoneNumber,
      createdBy: user._id,
    };

    try {
      const res = await axios.post(
        "https://ivypodsbackend.up.railway.app/api/todo",
        newPin
      );
      setPins([...pins, res.data]);
      //   document.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  //   if (status) {
  //     return <Home />;
  //   }
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">Yellow Class Assignemnt</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add Contact</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Phone Number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Table;
