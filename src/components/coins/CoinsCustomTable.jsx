import { TableBody, TableCell, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const CoinsCustomTable = ({ coins, page }) => {
  const navigate = useNavigate();
  const boxSX = {
    "&:hover": {
      color: "gray",
      backgroundColor: "#1111",
    },
  };

  const navigateToCoinOage = (coin) => {
    navigate(`/coins/${coin.id}`);
  };
  return (
    <TableBody>
      {coins.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin) => {
        return (
          <TableRow
            style={{
              cursor: "pointer",
            }}
            className="cointablerow"
            onClick={navigateToCoinOage.bind(null, coin)}
            key={coin.id}
            sx={boxSX}
          >
            <TableCell
              component="th"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              scope="row"
            >
              <img
                style={{ borderRadius: "50%", marginBottom: 10 }}
                width="50"
                height="50"
                src={coin?.image}
                alt={coin.id}
              />
              <Container>
                <p
                  style={{ textTransform: "uppercase", fontWeight: "600" }}
                  className="symbolCoin"
                >
                  {coin.symbol}
                </p>
                <p style={{ fontWeight: "600" }} className="nameCoin">
                  {coin.name}
                </p>
              </Container>
            </TableCell>
            <TableCell align="right">₹{coin.current_price}</TableCell>
            <TableCell
              align="right"
              style={
                coin.price_change_24h > 0
                  ? { color: "green", fontWeight: "700" }
                  : { color: "red", fontWeight: "700" }
              }
            >
              ₹{coin.price_change_24h.toFixed(2)}
            </TableCell>
            <TableCell align="right">₹{coin.market_cap}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default CoinsCustomTable;
