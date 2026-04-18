import CryptoCard from "./CryptoCard";

const CryptoList = ({ data }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",  // ✅ Always 4 equal columns
        gap: "20px",
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",  // ✅ Prevents padding from causing overflow
      }}
    >
      {data.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default CryptoList;