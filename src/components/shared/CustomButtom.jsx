import { Button } from "@mui/material";
import React from "react";

const CustomButtom = ({ children, selected, onClick }) => {
  const boxSX = {
    "&:hover": {
      backgroundColor: "#1111",
    },
  };
  return (
    <Button
      sx={boxSX}
      onClick={onClick}
      style={{
        border: "1px solid black",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "blue" : "",
        color: selected ? "white" : "black",
        fontWeight: 500,
        width: "22%",
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButtom;
