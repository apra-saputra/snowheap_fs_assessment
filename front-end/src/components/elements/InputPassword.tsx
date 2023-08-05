import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";

interface InputPasswordProps extends InputCustomProps {}

const InputPassword = ({
  value,
  placeholder,
  className,
  onChange,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={`text-center relative ${className ? className : ""}`}>
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        size="lg"
        placeholder={showPassword ? `show ${placeholder}` : placeholder}
      />
      <div className="absolute top-1/4 right-5 text-gray-300 bg-background">
        {showPassword ? (
          <FontAwesomeIcon
            className="opacity-30"
            icon={faEye}
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FontAwesomeIcon
            className="opacity-30"
            color="red"
            icon={faEyeSlash}
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>
    </div>
  );
};

export default InputPassword;
