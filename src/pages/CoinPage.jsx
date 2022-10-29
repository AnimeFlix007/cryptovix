import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/coins/CoinInfo";
import { SingleCoin } from "../config/api";
import "../styles.css";
import LoadingCrypto from "../components/shared/LoadingLinear";
import parse from "html-react-parser";
import AddCardIcon from "@mui/icons-material/AddCard";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useContext } from "react";
import { Crypto } from "../context/CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState({});
  const { user, setAlert, watchlist } = useContext(Crypto);
  const fetchSingleCoin = async (id) => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoinData(data);
    setLoading(false);
    return data;
  };
  useEffect(() => {
    fetchSingleCoin(id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const inWatchList = watchlist.includes(coinData?.id);
  console.log(inWatchList);

  const addToWatchListHandler = async () => {
    if (!user) {
      setAlert({
        open: true,
        message: "You are not Logged In. Please LogIn..",
        type: "error",
      });
      return;
    }
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist ? [...watchlist, coinData?.id] : [coinData?.id],
        },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coinData.name} has been added to your watchList`,
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

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coinData?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coinData.name} Removed from the Watchlist !`,
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
    <React.Fragment>
      {loading && <LoadingCrypto />}
      {!loading && coinData && (
        <div className="container">
          <div className="sidebar">
            <img
              src={coinData?.image?.large}
              alt={coinData?.name}
              height="200"
              style={{ marginBottom: 20, borderRadius: "10px" }}
            />
            <Typography
              variant="h3"
              style={{
                fontWeight: "600",
                marginBottom: 15,
                fontFamily: "monospace",
              }}
            >
              {coinData?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                width: "100%",
                padding: "3rem",
                paddingTop: "5%",
                paddingBottom: 15,
                textAlign: "justify",
              }}
            >
              {coinData?.description?.en.split(". ")[0]} {". "}
              {coinData?.description?.en.split(". ")[1]}
            </Typography>
            <Container style={{ marginBottom: "3rem", fontSize: "15px" }}>
              <span style={{ display: "flex" }} className="marketData">
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "600",
                    paddingLeft: "2rem",
                    fontSize: "20px",
                    fontFamily: "monospace",
                  }}
                >
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                  }}
                >
                  {coinData?.market_cap_rank}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                    paddingLeft: "2rem",
                    fontFamily: "monospace",
                  }}
                >
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                  }}
                >
                  {"₹"} {coinData?.market_data?.current_price["inr"]}
                </Typography>
              </span>
              <span style={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    paddingLeft: "2rem",
                    fontFamily: "monospace",
                  }}
                >
                  Market Cap:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                  }}
                >
                  {"₹"}{" "}
                  {coinData?.market_data?.market_cap["inr"]
                    .toString()
                    .slice(0, -6)}{" "}
                  M
                </Typography>
              </span>
              {!inWatchList && (
                <Button
                  style={{
                    width: "85%",
                    margin: " 10px 20px",
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "600",
                  }}
                  onClick={addToWatchListHandler}
                >
                  <AddCardIcon style={{ marginRight: 5, fontSize: "20px" }} />
                  ADD TO WATCHLIST
                </Button>
              )}
              {inWatchList && (
                <Button
                  style={{
                    width: "85%",
                    margin: " 10px 20px",
                    backgroundColor: "RED",
                    color: "white",
                    fontWeight: "600",
                  }}
                  onClick={removeFromWatchlist}
                >
                  <DisabledByDefaultIcon
                    style={{ marginRight: 5, fontSize: "20px" }}
                  />
                  REMOVE FROM WATCHLIST
                </Button>
              )}
            </Container>
          </div>
          <CoinInfo coin={coinData} />
        </div>
      )}
    </React.Fragment>
  );
};

export default CoinPage;
