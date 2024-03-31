import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/AboutStyle.css";
const About = () => {
  return (
    <Layout title={"about-us"}>
      <div className="container">
        <div className="container-md">
          <div className="content">
            <h1>About Us</h1>
            <hr />
            <p className="fs-5">
              <span className="about-text">Hello, I Am Kamlesh Bhati</span> As a
              Web developer, I Build user friendly web application using React
              js, Javascript, Nodejs, and Mongodb and I have also good problem
              solving skills. Seeking an entry-level position in software
              development to apply my academic knowledge and gain practical
              experience in a dynamic and innovative environment.
            </p>
            <h3>Skills</h3>
            <ul>
              <li>React js</li>
              <li>Node js</li>
              <li>Express js</li>
              <li>Mongodb</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Javascript</li>
              <li>Problem Solving</li>
            </ul>
          </div>
          <div className="about-img">
            <img src="/images/about.jpg" alt="profile" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
