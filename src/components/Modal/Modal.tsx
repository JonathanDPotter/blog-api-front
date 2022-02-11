import React, { FC } from "react";
import { useLocation } from "react-router-dom";
// styles
import "./Modal.scss";

interface Iprops {
  message: string;
  closeFunction: () => void;
  deleteFunction?: () => void;
}

const Modal: FC<Iprops> = ({ message, closeFunction, deleteFunction }) => {
  const location = useLocation();

  return (
    <div className="modal-back">
      <div className="modal-front">
        <h1>Alert!</h1>
        <p>{message}</p>
        <button onClick={closeFunction} autoFocus>
          Close
        </button>
        {location.pathname === "/myposts" && (
          <button onClick={deleteFunction}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default Modal;
