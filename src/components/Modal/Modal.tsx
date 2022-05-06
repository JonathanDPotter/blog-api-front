import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";

interface Iprops {
  message: string;
  closeFunction: () => void;
  deleteFunction?: () => void;
}

const Modal: FC<Iprops> = ({ message, closeFunction, deleteFunction }) => {
  const location = useLocation();

  return (
    <div
      className="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-500/50"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-2/3 max-w-md m-auto pointer-events-auto bg-yellow bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              Alert!
            </h5>
          </div>
          <div className="modal-body relative p-4">{message}</div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <Button text="Close" onClick={closeFunction} />
            {location.pathname === "/myposts" && (
              <Button text="Delete" onClick={deleteFunction} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
