import { useEffect, useState, useMemo } from "react";
import { fetchCrypto } from "./services/api";
import CryptoList from "./components/CryptoList";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");  
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    return data.filter((coin) =>
      coin.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [data, debouncedSearch]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetchCrypto();
  //     setData(res);
  //     setLoading(false);
  //   };
  //   getData();
  // }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
  
    return () => clearTimeout(timer);
  }, [search]);



  useEffect(() => {
    const getData = async () => {
      const res = await fetchCrypto(page);
      setData((prev) => [...prev, ...res]);
      setLoading(false);
    };
  
    getData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };
    // if (loading) return;
  
    window.addEventListener("scroll", handleScroll);
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<div
  style={{
    minHeight: "100vh",
    width: "100vw",   // 🔥 THIS IS IMPORTANT
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    padding: "20px",
    boxSizing: "border-box",
  }}
>
      <h1 style={{ textAlign: "center" }}> Crypto Dashboard</h1>

      {/* 👇 SEARCH BAR GOES HERE */}
      <input
        type="text"
        placeholder="Search crypto..."
        style={{
          padding: "12px",
          width: "320px",
          margin: "20px auto",
          display: "block",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.05)",
          color: "white",
          outline: "none",
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <CryptoList data={filtered} />
      )}
    </div>
  );
}

export default App;