import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./aboutUs.css";

import teamMemberImage1 from "../../resources/hxh.jpg"; 
import teamMemberImage2 from "../../resources/flq.jpg"; 
import teamMemberImage3 from "../../resources/lrb.jpg"; 

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="aboutUsContainer">
        <div className="aboutUsWrapper">
          {/* 团队介绍部分 */}
          <section className="teamSection">
            <h2 className="sectionTitle">Meet Our Team</h2>
            <div className="teamMembers">
              <div className="teamMember">
                <img
                  src={teamMemberImage1}
                  alt="Team Member 1"
                  className="teamMemberImg"
                />
                <h3 className="teamMemberName">hxh</h3>
                <p className="teamMemberRole">Overwatcher</p>
                <p className="teamMemberSkills">Skills: Overwatch</p>
              </div>
              <div className="teamMember">
                <img
                 src={teamMemberImage2}
                  alt="Team Member 2"
                  className="teamMemberImg"
                />
                <h3 className="teamMemberName">flq</h3>
                <p className="teamMemberRole">Frontend Developer</p>
                <p className="teamMemberSkills">Skills: React, CSS, JavaScript</p>
              </div>
              <div className="teamMember">
                <img
                  src={teamMemberImage3}
                  alt="Team Member 3"
                  className="teamMemberImg"
                />
                <h3 className="teamMemberName">lrb</h3>
                <p className="teamMemberRole">Player</p>
                <p className="teamMemberSkills">Skills: Play NiShuiHan && Monster Hunter</p>
              </div>
            </div>
          </section>

          {/* 项目介绍部分 */}
          <section className="projectSection">
            <h2 className="sectionTitle">About the Project</h2>
            <p className="projectDesc">
              This project is a booking system built with React and Node.js, focusing on providing users with an easy way to find and book hotels.
            </p>
            <h3>Technologies Used</h3>
            <ul className="techStackList">
              <li>React.js</li>
              <li>Node.js</li>
            </ul>
            <h3>Project Goals</h3>
            <p className="projectGoals">
              The goal of this project is to create an easy-to-use and efficient hotel booking system for users. It is designed to help people find accommodation easily and quickly.
            </p>
          </section>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
