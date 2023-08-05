import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ToggleSwitchProps {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, setIsOn }) => {
  const toggleSwitch = () => setIsOn((state) => !state);

  const spring = {
    type: "spring",
    stiffness: 600,
    damping: 20,
  };

  return (
    <AnimatePresence initial={false}>
      <div
        onClick={toggleSwitch}
        className={`px-2 py-4 w-20 h-5 flex ${
          isOn ? "justify-end" : "justify-start"
        } items-center bg-white rounded-3xl`}
      >
        <motion.div
          className="rounded-full bg-orange-400 w-5 h-5"
          layout
          transition={spring}
        />
      </div>
    </AnimatePresence>
  );
};

export default ToggleSwitch;
