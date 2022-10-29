import React, { useContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { Crypto } from "../../context/CryptoContext";

import CryptoLogo from "../../images/cryptoLogo.jfif";
import AuthModal from "../auth/AuthModal";
import UserSidebar from "../user/UserSidebar";

const Header = () => {
  const { user } = useContext(Crypto)
  return (
    <div className="header">
      <Container style={{ padding: "0%" }}>
        <Toolbar>
          <Link to={"/"} style={{ width: "90%" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bolder",
              }}
            >
              <img
                src={CryptoLogo}
                alt="CryptoLogo"
                style={{ borderRadius: "50%", width: "30px" }}
              />
              RYPTO
            </Typography>
          </Link>
          {/* login and signup modals  */}
          {!user && <AuthModal />}
          {user && <UserSidebar />}

        </Toolbar>
      </Container>
    </div>
  );
};

export default Header;
