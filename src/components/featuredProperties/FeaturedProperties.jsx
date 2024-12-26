import "./featuredProperties.css";

const FeaturedProperties = () => {
  return (
    <div className="fp">
      <div className="fpItem">
        <img
          src="https://tse4-mm.cn.bing.net/th/id/OIP-C.1tW7WUaNX6UerDUSYY7OMwHaE1?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
          className="fpImg"
        />
        <span className="fpName">FuZhou University</span>
        <span className="fpCity">FuZhou</span>
        <span className="fpPrice">Starting from $120</span>
        <div className="fpRating">
          <button>5.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://tse4-mm.cn.bing.net/th/id/OIP-C.I1plNlbacEkH463uniGytgHaEc?w=209&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
          className="fpImg"
        />
        <span className="fpName">Maynooth Univerty</span>
        <span className="fpCity">Maynooth</span>
        <span className="fpPrice">Starting from $140</span>
        <div className="fpRating">
          <button>9.5</button>
          <span>Exceptional</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
