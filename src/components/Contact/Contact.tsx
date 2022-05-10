import React from "react";

const Contact = () => {
  return (
    <div className="page">
      <h2 className="page-title">Contact</h2>
      <div className="container">
        <p>
          You can contact me by{" "}
          <a
            href="mailto: jonathan.d.potter@outlook.com"
          >
            email
          </a>
          .
        </p>
        <p>
          You can visit my{" "}
          <a href="https://github.com/JonathanDPotter">github</a> and leave an
          issue on this repo there.
        </p>
      </div>
    </div>
  );
};

export default Contact;
