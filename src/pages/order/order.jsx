import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./order.css";

const Order = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">

        <h1 className="homeTitle">rowse by property type</h1>

        <h1 className="homeTitle">Homes guests love</h1>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Order;
