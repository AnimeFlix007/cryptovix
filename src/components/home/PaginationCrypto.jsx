import { Pagination } from "@mui/material";
import React from "react";

const PaginationCrypto = ({ count, setPage }) => {
  return (
    <Pagination
      count={parseInt(count)}
      style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
      onChange={(e, value) => {
        setPage(value);
      }}
    />
  )
};

export default PaginationCrypto;
