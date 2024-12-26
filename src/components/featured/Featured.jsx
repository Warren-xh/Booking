import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://tse3-mm.cn.bing.net/th/id/OIP-C.BVCR4fpYwtkEZNd2v1hMfgHaE8?w=253&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>FuZhou</h1>
          <h2>123 properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://tse2-mm.cn.bing.net/th/id/OIP-C.Rankv9dtPMH06jogPdwWAAHaE7?w=257&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Dublin</h1>
          <h2>533 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.a9rVWpBUO5b39wqmXQakiwHaE8?w=296&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>BeiJing</h1>
          <h2>532 properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
