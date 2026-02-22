import React from "react";
import { Link } from "react-router-dom";

const baseStyle = `
  text-base
  rounded-md
  bg-amber-400
  text-amber-900
  px-4 py-2
  min-w-[8rem]
  inline-flex
  items-center
  justify-center
  transition
  hover:shadow-[0_0_0_3px_#fea,0_0_0_4px_#fb1]
  focus:outline-none
  disabled:opacity-50
  disabled:cursor-wait
`;

type ButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonAsLink = ButtonBaseProps & {
  as: "link";
  to: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = (props: ButtonProps) => {
  const { children, className = "" } = props;

  if (props.as === "link") {
    return (
      <Link
        to={props.to}
        className={`${baseStyle} inline-block ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={`${baseStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;