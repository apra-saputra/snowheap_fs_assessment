import React from "react";
import imageLogin from "@/assets/images/login.png";
import { Outlet } from "react-router-dom";

// interface AuthLayoutProps extends LayoutProps {}

const AuthLayout: React.FC = ({}) => {
  return (
    <main className="max-w-[100dvw] overflow-x-hidden bg-background">
      <section className="h-screen flex justify-between items-center">
        <div className="w-4/6 h-full hidden lg:flex bg-secondary justify-center items-center">
          <img
            src={imageLogin}
            alt="Login Image"
            className="object-scale-down object-center hidden lg:block mix-blend-multiply"
            loading="lazy"
          />
        </div>
        <div className="flex justify-center items-center w-full lg:w-3/6 h-full px-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
