import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChildItem = ({
  name,
  path,
  icon,
  className,
  handleAction,
}: ChildItemProps) => {
  return (
    <div
      className={`cursor-pointer transition-all duration-300  hover:text-accent pb-1 ${
        className ? className : ""
      }`}
      onClick={() => handleAction(path)}
    >
      <FontAwesomeIcon icon={icon} color="inherit" />
      {" " + name}
    </div>
  );
};

export default ChildItem;
