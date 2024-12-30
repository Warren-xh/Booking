import "./featured.css";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();

  const handleSearch = (destination) => {
    navigate("/hotels", {
      state: { destination, date: [], options: {} },
    });
  };

  return (
    <div className="featured">
      <div className="featuredItem" onClick={() => handleSearch("Fuzhou")}>
        <img
          src="https://tse3-mm.cn.bing.net/th/id/OIP-C.BVCR4fpYwtkEZNd2v1hMfgHaE8?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="FuZhou"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Fuzhou</h1>
          <h2>10 properties</h2>
        </div>
      </div>

      <div className="featuredItem" onClick={() => handleSearch("Dublin")}>
        <img
          src="https://tse2-mm.cn.bing.net/th/id/OIP-C.Rankv9dtPMH06jogPdwWAAHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="Dublin"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dublin</h1>
          <h2>10 properties</h2>
        </div>
      </div>

      <div className="featuredItem" onClick={() => handleSearch("BeiJing")}>
        <img
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.a9rVWpBUO5b39wqmXQakiwHaE8?w=296&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="BeiJing"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>BeiJing</h1>
          <h2>3 properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
