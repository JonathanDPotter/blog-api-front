import React from "react";

const About = () => {
  return (
    <div className="about page">
      <h1>About This Website</h1>
      <p>This is a fake blog that I made for the Odin Project blog project.</p>
      <p>
        You are viewing the front end that was made in React using typescript.
        The front end uses a back end api that was made with express and
        typescritpt. The back end is hosted on heroku at{" "}
        <a
          href="https://jonathan-potter-rest-api.herokuapp.com"
          target="_blank"
          rel="noreferrer"
        >
          https://jonathan-potter-rest-api.herokuapp.com/
        </a>{" "}
        and the github repo can be found here:{" "}
        <a
          href="https://github.com/JonathanDPotter/rest-api"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/JonathanDPotter/rest-api
        </a>
        .
      </p>
      <p>
        The font I am using is called "VT323" and is available from google
        fonts.
      </p>
    </div>
  );
};

export default About;
