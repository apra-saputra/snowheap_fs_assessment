import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "@/components/elements/Button";
import imageLogin from "@/assets/images/login.png";
import Input from "@/components/elements/Input";
import InputPassword from "@/components/elements/InputPassword";
import { useAuth } from "@/contexts/AuthContext";
import useSweetAlert from "@/hooks/useSweetAlert";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();
  const { toast } = useSweetAlert();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/")
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error)
      toast(error as string, "error");
    }
  };

  return (
    <div className="flex flex-col items-center bg-secondary min-h-[400px] w-5/6 pb-6 md:pb-4 rounded-lg overflow-hidden">
      <div className="bg-primary py-6 px-4 flex flex-col items-center w-full">
        <img
          src={imageLogin}
          alt="Login Image"
          className="w-3/5 aspect-square object-cover object-center rounded-lg lg:hidden mb-4 mix-blend-multiply"
          loading="lazy"
        />
        <h1 className=" text-3xl font-semibold pb-1 w-full text-center">
          Login
        </h1>
        <p className="text-sm">if you have account please login</p>
      </div>

      <form onSubmit={handleLogin} className="w-4/5 flex flex-col gap-4 py-6">
        <div className="flex flex-col gap-4 py-3 border-t-2 border-b-2 border-primary">
          <div className="w-full text-center">
            <Input
              type="email"
              placeholder="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <InputPassword
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <div className="w-full flex justify-between items-center gap-2 mt-2">
          <Button type="submit">Submit</Button>
          <span className="text-sm">-- OR --</span>
          <Button type="button" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
