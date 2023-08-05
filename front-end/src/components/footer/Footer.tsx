import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-full max-w-screen-2xl w-full flex flex-col-reverse gap-4 md:gap-0 md:flex-row justify-center md:justify-between items-center py-10 px-4 md:px-2">
        <span>
          © 2023 | Power by <strong>Vite-React</strong>
        </span>

        <div className="flex flex-col items-center gap-4">
          <h2>Contact Developer @apra-saputra</h2>
        </div>
      </div>
    </div>
  );
};

export default Footer;
