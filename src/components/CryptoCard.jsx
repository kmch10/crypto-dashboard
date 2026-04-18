import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
import { useState, useEffect } from "react";
import { fetchChartData } from "../services/api";

const CryptoCard = ({ coin }) => {
    const change = coin.price_change_percentage_24h || 0;
    // const chartData = [
    //     { time: "1", price: coin.current_price - 10 },
    //     { time: "2", price: coin.current_price - 5 },
    //     { time: "3", price: coin.current_price },
    //   ];
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        if (showChart) {
          fetchChartData(coin.id).then((data) => {
            const formatted = data.map((item) => ({
                time: new Date(item[0]).toLocaleDateString(),
                price: item[1],
              }));
            setChartData(formatted);
          });
        }
      }, [showChart]);
  
    return (
<div
  onClick={() => setShowChart(!showChart)}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
  style={{
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "20px",
    margin: "10px",
    width: "260px",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer",
  }}
>
        <img src={coin.image} alt={coin.name} width="40" />
        <h3>{coin.name}</h3>
        <p>💰₹{coin.current_price.toLocaleString()}</p>
        <p
          style={{
            color: change > 0 ? "green" : "red",
          }}
        >
          {change.toFixed(2)}%
        </p>
        <p>Rank: #{coin.market_cap_rank}</p>
        {showChart && (

<ResponsiveContainer width="100%" height={150}>
  <LineChart data={chartData}>
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="price"
      stroke="#22c55e"
      strokeWidth={3}
      dot={false}
    />
  </LineChart>
</ResponsiveContainer>
  
)}
      </div>
    );
  };
  
  export default CryptoCard;