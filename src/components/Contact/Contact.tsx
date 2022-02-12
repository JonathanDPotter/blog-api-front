import React from "react";
// styles
import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact page">
      <h1>Contact</h1>
      <p>
        You can contact me by{" "}
        <a href="mailto: jonathan.d.potter@outlook.com">email</a>.
      </p>
      <p>
        You can visit my <a href="https://github.com/JonathanDPotter">github</a>{" "}
        and leave an issue on this repo there.
      </p>
    </div>
  );
};

export default Contact;
