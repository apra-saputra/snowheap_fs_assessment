import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import ChildItem from "./ChildItem";
import { useAuth } from "@/contexts/AuthContext";
import useSweetAlert from "@/hooks/useSweetAlert";

const Item: React.FC<ItemProps> = ({ item, setOpen }) => {
  const navigate = useNavigate();
  const pathFromNext = useLocation().pathname;

  const { logout } = useAuth();
  const { toast } = useSweetAlert();

  const [openChild, setOpenChild] = useState(false);

  const handleNavbarAction = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleOpenInnerMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenChild((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setOpen(false);
      await logout();
      navigate("/login");
    } catch (error) {
      toast(error as string, "error");
    }
  };

  const variants = {
    close: { opacity: 0, y: -200 },
    open: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return !item.child ? (
    <li>
      <ChildItem
        icon={item.icon}
        name={item.name}
        path={item.path}
        handleAction={
          item.name === "Logout" ? handleLogout : handleNavbarAction
        }
        className={`${
          pathFromNext === item.path
            ? "md:border-b-2 md:border-accent md:hover:border-accent"
            : ""
        }`}
      />
    </li>
  ) : (
    <>
      <li className="flex flex-row gap-4 font-semibold">
        <ChildItem
          icon={item.icon}
          name={item.name}
          path={item.path}
          handleAction={handleNavbarAction}
          className={`${
            pathFromNext === item.path
              ? "md:border-b-2 md:border-accent md:hover:border-accent"
              : ""
          }`}
        />
        <div
          onClick={(e) => handleOpenInnerMenu(e)}
          className="cursor-pointer  hidden md:inline"
        >
          <div
            className={`hover:dark:text-primary hover:text-cyan-400 ${
              openChild ? "text-cyan-400" : ""
            }`}
          >
            <FontAwesomeIcon icon={faGrip} size="lg" />
          </div>
          <motion.div
            className="relative"
            animate={openChild ? "open" : "close"}
            variants={variants}
          >
            <AnimatePresence initial={false}>
              {openChild && (
                <motion.div
                  className={`absolute bg-tertiary dark:bg-primary p-4 top-4 right-0 rounded-lg w-44`}
                  exit={{ opacity: 0, y: -100 }}
                >
                  <ul className="flex flex-col gap-2 items-center flex-wrap">
                    {item.child.map((item, index) => {
                      return (
                        <li key={index}>
                          <ChildItem
                            icon={item.icon}
                            name={item.name}
                            path={item.path}
                            handleAction={handleNavbarAction}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </li>
    </>
  );
};

export default Item;
