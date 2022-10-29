/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  TableCell,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useEffect, useState } from "react";
import Loading from "../shared/LoadingLinear";
import CoinsCustomTable from "./CoinsCustomTable";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PaginationCrypto from "../home/PaginationCrypto";
import { useContext } from "react";
import { Crypto } from "../../context/CryptoContext";

const CoinsTable = () => {
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [searchCoin, setSearchCoin] = useState("");
  const [page, setPage] = useState(1);

  const { loading, coins, fetchCoins } = useContext(Crypto)

  useEffect(() => {
    fetchCoins()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    setFilteredCoins(
      coins.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(searchCoin.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchCoin.toLowerCase())
        );
      })
    );
  }, [searchCoin, coins]);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: 15, fontFamily: "monospace" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <Container>
        <Typography
          variant="p"
          style={{
            fontSize: "15px",
            fontFamily: "monospace",
          }}
        >
          The global cryptocurrency market cap today is $955 Billion, a{" "}
          <span style={{ color: "green", fontWeight: "700" }}>
            0.5%{" "}
            <ArrowUpwardIcon style={{ fontSize: "12px", fontWeight: "700" }} />
          </span>{" "}
          change in the last 24 hours{" "}
        </Typography>
      </Container>
      <Container>
        <TextField
          style={{
            flex: 1,
            width: "100%",
            marginTop: "2rem",
          }}
          className="searchBox"
          label="Search"
          variant="filled"
          placeholder="Search For A Crypto Currency.."
          autoComplete="none"
          value={searchCoin}
          onChange={(e) => {
            setSearchCoin(e.target.value);
            if(page>1){
              setPage(1);
            }
          }}
        />
      </Container>
      <Container>
        <TableContainer>
          <Table>
            <TableHead style={{ background: "black" }}>
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "600" }}>
                  Coin
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "600" }}
                  align="right"
                >
                  Price&nbsp;(₹)
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "600" }}
                  align="right"
                >
                  24h Change&nbsp;(₹)
                </TableCell>
                <TableCell
                  style={{ color: "white", fontWeight: "600" }}
                  align="right"
                >
                  Market Cap&nbsp;(₹)
                </TableCell>
                -{" "}
              </TableRow>
            </TableHead>
            {loading && <Loading />}
            {!loading && coins && filteredCoins && (
              <CoinsCustomTable coins={filteredCoins} page={page} />
            )}
            {!loading && coins && searchCoin && filteredCoins.length === 0 && (
              <Container
                style={{ textAlign: "center", width: "100%", height: "50vh" }}
              >
                <h3>No Results Found</h3>
              </Container>
            )}
          </Table>
        </TableContainer>
      </Container>
      {filteredCoins.length > 10 && (
        <PaginationCrypto
          count={String((filteredCoins.length / 10).toFixed(0))}
          setPage={setPage}
        />
      )}
    </Container>
  );
};

export default CoinsTable;