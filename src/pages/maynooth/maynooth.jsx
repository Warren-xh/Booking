import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./maynooth.css";

const Maynooth = () => {
  return (
    <div>
      <Navbar />
      <Header type = "list" />
      <div className="homeContainer">

        <h1 className="homeTitle">rowse by property type</h1>

        <h1 className="homeTitle">Homes guests love</h1>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Maynooth ;
