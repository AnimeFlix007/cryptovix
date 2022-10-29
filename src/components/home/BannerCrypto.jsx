import { Typography } from "@mui/material";
import React from "react";
import "../../App.css";
import CarousalCrypto from "./CarousalCrypto";

const BannerCrypto = () => {
  return (
    <div className="banner">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          fontWeight: "700",
          paddingTop: "6rem",
        }}
      >
        <Typography
          className="cryptoHeading"
          style={{
            fontFamily: "Tahoma",
            letterSpacing: "3.1px",
            fontWeight: "600"
          }}
          variant="h4"
          gutterBottom
        >
          CryptoCurrency
        </Typography>
        <Typography variant="p" align="center" gutterBottom>
          Get all news & updates regarding CryptoCurrency
        </Typography>
      </div>
      <CarousalCrypto />
    </div>
  );
};

export default BannerCrypto;
