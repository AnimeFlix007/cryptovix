/* eslint-disable array-callback-return */
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Crypto } from "../../context/CryptoContext";
import { Avatar } from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, watchlist, coins } = React.useContext(Crypto);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  function logoutHandler() {
    signOut(auth);
    setAlert({ open: true, message: "LogOut Successfully", type: "success" });
  }
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            src={user.photoURL}
            alt={user.name || user.email}
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Container
              style={{
                width: 250,
                padding: 15,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <Container
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "92%",
                }}
              >
                <Avatar
                  src={user.photoURL}
                  alt={user.name || user.email}
                  style={{
                    width: 150,
                    height: 150,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                  width={100}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
              </Container>
              <Container
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "#1111",
                  borderRadius: 10,
                  padding: 15,
                  paddingTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  overflowY: "scroll",
                }}
              >
                <span style={{ fontSize: 15, color: "black" }}>Watchlist</span>
                {watchlist.length === 0 && (
                  <Container style={{ width: "100%", textAlign: "center" }} >
                    WatchList Is Empty
                  </Container>
                )}
                {coins.map((coin) => {
                  if (watchlist.includes(coin.id)) {
                    return (
                      <Container
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          color: "black",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#1111",
                          boxShadow: "0 0 3px black",
                        }}
                      >
                        <span>{coin.name}</span>
                        <span style={{ display: "flex", gap: 8 }}>
                          ₹{coin.current_price.toFixed(2)}
                          <DeleteIcon
                            style={{ cursor: "pointer" }}
                            fontSize="16"
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span>
                      </Container>
                    );
                  }
                })}
              </Container>
            </Container>
            <Button
              onClick={logoutHandler}
              style={{
                margin: " 10px 20px",
                backgroundColor: "red",
                color: "white",
                fontWeight: "600",
              }}
            >
              LogOut
            </Button>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
