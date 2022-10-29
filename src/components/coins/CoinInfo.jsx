/* eslint-disable no-unused-vars */
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../../config/api";
import { Container } from "@mui/system";
import CustomButtom from "../shared/CustomButtom";
import { Chart as ChartJS } from "chart.js/auto";

const CoinInfo = ({ coin }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [historicData, setData] = useState([]);
  const [days, setDays] = useState(1);
  const fetchData = async (id) => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(id, days, "inr"));
    setData(data.prices);
    setLoading(false);
    return data.prices;
  };

  useEffect(() => {
    fetchData(id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [id, days]);

  return (
    <div className="containerChats">
      {loading ? (
        <CircularProgress style={{ color: "blue" }} size={75} thickness={1} />
      ) : (
        <Line
          data={{
            labels: historicData?.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price ( Past ${days} Days ) in Rupees`,
                borderColor: "#0000FF"
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      )}
      <Container
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <CustomButtom onClick={()=>setDays(1)} selected={days===1}>24 hrs</CustomButtom>
        <CustomButtom onClick={()=>setDays(30)} selected={days===30}>30 Days</CustomButtom>
        <CustomButtom onClick={()=>setDays(180)} selected={days===180}>6 Months</CustomButtom>
        <CustomButtom onClick={()=>setDays(365)} selected={days===365}>365 Days</CustomButtom>
      </Container>
    </div>
  );
};

export default CoinInfo;
