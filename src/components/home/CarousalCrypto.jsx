import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";

const CarousalCrypto = () => {
  const [trendingData, setTrendingData] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins("inr"));
    setTrendingData(data);
    return data;
  };

  useEffect(() => {
    fetchTrendingCoins()
      .then((data) => {
        // console.log("success --> ", data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const items = trendingData.map((data) => {
    let profit = data.price_change_percentage_24h > 0;
    return (
      <Link
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
        to={`/coins/${data.id}`}
      >
        <img
          src={data?.image}
          alt={data.name}
          height="80"
          style={{ marginBottom: 30 }}
        />
        <span style={{ fontWeight: "bolder" }}>
          {data?.symbol} &nbsp;{" "}
          <span className={profit ? "more" : "less"}>
            {profit && "+"} {data?.price_change_percentage_24h.toFixed(2)}%
          </span>{" "}
        </span>
        <span style={{ marginTop: "3px", fontWeight: "600" }} >₹{data?.current_price.toFixed(2)}</span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default CarousalCrypto;
