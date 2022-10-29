import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AppBar, Tab, Tabs } from "@mui/material";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useContext } from "react";
import { Crypto } from "../../context/CryptoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: 2
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { setAlert } = useContext(Crypto)

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider()

  const signInGoogleHandler = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      setAlert({
        open: true,
        message: `Logged in Sucecssfully to your Google account. Welcome ${res.user.displayName}`,
        type: "success"
      })
    }).then(() => handleClose()).catch((err) => {
      setAlert({
        open: true,
        message: err.message,
        type: "error"
      })
    })
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        color="inherit"
        style={{
          marginLeft: "20px",
          backgroundColor: "#0033cc",
          color: "white",
          fontWeight: "600",
        }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "lightskyblue",
              borderRadius: 10
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{ borderRadius: 10 }}
            >
              <Tab
                label="Login"
                style={{
                  fontWeight: "600",
                  color: "darkBlue",
                }}
              />
              <Tab
                label="Sign Up"
                style={{
                  fontWeight: "600",
                  color: "darkBlue",
                }}
              />
            </Tabs>
          </AppBar>
          {value === 0 && <LoginModal handleClose={handleClose} />}
          {value === 1 && <SignUpModal handleClose={handleClose} />}
          <Box style={{
            padding: 24,
            paddingTop: 0,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: 20,
            fontSize: 20,
          }} >
            <span style={{ fontSize: 15 }} >OR</span>
            <GoogleButton style={{ width: "100%", outline: "none" }} onClick={signInGoogleHandler} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
