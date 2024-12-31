import "./maynooth.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import m01 from "../../resources/m01.jpg";
import m02 from "../../resources/m02.jpg";
import m03 from "../../resources/m03.jpg";
import m04 from "../../resources/m04.jpg";
import m05 from "../../resources/m05.jpg";
import m06 from "../../resources/m06.jpg";
const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = [
    {
      src: m01,
    },
    {
      src: m02,
    },
    {
      src: m03,
    },
    {
      src: m04,
    },
    {
      src: m05,
    },
    {
      src: m06,
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">Maynooth University</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>outside of Dublin ,Maynooth, Ireland</span>
          </div>
          <span className="hotelDistance">
            located 25 kilometres outside of Dublin, Ireland.
          </span>
          <span className="hotelPriceHighlight">pictures</span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">CountrySide --peaceful leaning</h1>
              <p className="hotelDesc">
                Maynooth University is an internationally recognised institution
                located 25 kilometres outside of Dublin, Ireland. One of four
                constituent universities of the National University of Ireland,
                Maynooth University is in the top 90 global Times Higher
                Education Young University Rankings 2024. On 16 June 2022,
                Maynooth University celebrated its 25th birthday, having been
                formally established as an autonomous university in 1997. Yet,
                it traces its origins to the foundation of the Royal College of
                St. Patrick in 1795, drawing inspiration from a heritage that
                includes over 200 years of education and scholarship. Today,
                Maynooth University is a place of lively contrasts–a modern
                institution, dynamic, rapidly-growing, research-led and engaged,
                yet grounded in historic academic strengths and scholarly
                traditions. With over 15,000 students from more than 100
                countries, Maynooth offers a range of programmes at
                undergraduate, Master’s and PhD level in the humanities, science
                and engineering, and social sciences, including business, law,
                and education. The University also offers a range of
                international programmes and partnerships.
              </p>
              <p className="hotelDesc">
                Maynooth’s unique collegial culture fosters an interdisciplinary
                approach to research, which its world-class academics bring to
                bear in tackling some of the most fundamental challenges facing
                society today. The University’s research institutes and centres
                consolidate and deliver this impact as vibrant communities of
                learning, discovery and creation. Research at Maynooth also is
                very much central to its teaching, and the University prides
                itself on placing equal value on its research and teaching
                missions. Maynooth University is recognised among the top 600
                universities in the world and in the top 250 European
                universities.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for Learining!</h1>
              <span>
                located 25 kilometres outside of Dublin, Ireland. this property
                has an excellent location score of 9.8!
              </span>
              <h2>
                <b>$150</b> (1 semester)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
      </div>
    </div>
  );
};

export default Hotel;
