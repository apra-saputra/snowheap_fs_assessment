import {
  faHome,
  faBook,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export const MENUS = [
  {
    icon: faHome,
    name: "Home",
    path: "/",
  },
  {
    icon: faBook,
    name: "Projects",
    path: "/projects",
  },
  {
    icon: faArrowRightFromBracket,
    name: "Logout",
    path: "",
  },
];

export const OPTIONSTATUS = [
  { value: "PENDING", name: "PENDING" },
  { value: "ONPROGRESS", name: "ONPROGRESS" },
  { value: "DONE", name: "DONE" },
];
