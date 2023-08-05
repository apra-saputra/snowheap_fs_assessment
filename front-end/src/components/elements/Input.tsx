import React from "react";

interface InputProps extends InputCustomProps {
  type: React.HTMLInputTypeAttribute;
}

const Input = ({
  size,
  type,
  value,
  placeholder,
  className,
  onChange,
}: InputProps) => {

  let styleSize: string;

  switch (size) {
    case "sm":
      styleSize = "p-1 text-sm";
      break;
    case "lg":
      styleSize = "py-2 px-2 text-lg";
      break;
    default:
      styleSize = "py-1 px-2 text-base";
      break;
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full ${styleSize} bg-background rounded-lg border-2 border-primary  active::outline-[10px] active:outline-accent focus-visible:outline-[10px] focus-visible:outline-accent ${
        className ? className : ""
      }`}
      placeholder={placeholder}
    />
  );
};

export default Input;
