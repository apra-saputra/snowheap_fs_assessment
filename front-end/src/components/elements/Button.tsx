import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  children?: React.ReactNode;
  type: "submit" | "button" | "reset";
  size?: "sm" | "lg" | "md";
  onClick?: (params?: any) => void;
  disable?: boolean;
  className?: string;
};

const Button = ({ children, type, size, onClick, disable, className }: ButtonProps) => {
  let classSize: string;
  switch (size) {
    case "sm":
      classSize = "py-1 px-2 text-base font-medium";
      break;
    case "lg":
      classSize = "py-4 px-6 text-xl font-semibold";
      break;
    default:
      classSize = "py-2 px-4 text-lg font-medium";
      break;
  }
  return (
    <motion.button
      className={`${classSize} ${className} bg-accent rounded-lg transition-colors duration-300 ${
        disable ? "text-gray-400" : "hover:brightness-125 active:brightness-100"
      } `}
      type={type}
      onClick={() => onClick && onClick()}
      whileHover={{ scale: disable ? 1 : 1.1 }}
      whileTap={{ scale: disable ? 1 : 0.95 }}
      disabled={disable}
    >
      {children}
    </motion.button>
  );
};

export default Button;
