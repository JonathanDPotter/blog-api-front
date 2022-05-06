import React, { FC } from "react";
import ButtonTypes from "../../enums/ButtonTypes";

interface Iprops {
  text: string;
  classList?: string;
  disabled?: boolean;
  type?: ButtonTypes | undefined;
  onClick?: () => void;
}

const Button: FC<Iprops> = ({
  text,
  classList = "bg-dblue text-white font-bold py-2 px-4 rounded hover:bg-yellow hover:text-dblue max-w-[8rem]",
  type = undefined,
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      className={classList}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
