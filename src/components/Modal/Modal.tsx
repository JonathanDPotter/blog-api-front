import React, { FC } from "react";
// styles
import "./Modal.scss";

interface Iprops {
  message: string;
  closeFunction: () => void;
}

const Modal: FC<Iprops> = ({ message, closeFunction }) => {
  return (
    <div className="modal-back">
      <div className="modal-front">
        <h1>Alert!</h1>
        <p>{message}</p>
        <button onClick={closeFunction} autoFocus>Close</button>
      </div>
    </div>
  );
};

export default Modal;
