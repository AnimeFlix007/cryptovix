import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useContext } from "react";
import { Crypto } from "../../context/CryptoContext";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase/Firebase";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const { setAlert } = useContext(Crypto)
  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.length < 7 || email.trim() === '') {
      setAlert({ open: true, message: 'email should have atleast 7 characters', type: "error" })
      return
    }
    if (!(email.includes('@') && email.includes('.'))) {
      setAlert({ open: true, message: 'email should have @ and . character', type: "error" })
      return
    }
    if (password.length < 6) {
      setAlert({ open: true, message: 'Password should have atleast 6 characters', type: "error" })
      return
    }
    if (password !== cpassword) {
      setAlert({ open: true, message: 'Password do not match', type: "error" })
      return
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      setAlert({ open: true, message: "Sign Up SuccessFull", type: "success" })
    } catch (error) {
      setAlert({ open: true, message: error.message, type: "error" })
      return
    }

    handleClose();
  };
  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        type="email"
        label="Enter e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="outlined-basic"
        variant="outlined"
      />
      <TextField
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-basic"
        variant="outlined"
      />
      <TextField
        type="password"
        label="Enter Confirm Password"
        value={cpassword}
        onChange={(e) => setCPassword(e.target.value)}
        id="outlined-basic"
        variant="outlined"
      />
      <Button
        variant="contained"
        size="large"
        onClick={submitHandler}
        style={{ backgroundColor: "lightskyblue" }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
