import React from "react";

interface SelectOptionProps {
  data: { value: string | number; name: string }[];
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  size?: "sm" | "md" | "lg";
  defautText?: string;
}

const SelectOption = ({
  data,
  value,
  size,
  defautText,
  onChange,
}: SelectOptionProps) => {
  let styleSize: string = "";
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
    <select
      value={value}
      onChange={onChange}
      className={`w-full ${styleSize} bg-background rounded-lg border-2 border-primary active::outline-[10px] active:outline-accent  focus-visible:outline-[10px] focus-visible:outline-accent `}
    >
      <option value={typeof value === "number" ? 0 : ""} disabled>
        {defautText ? defautText : "Default Option"}
      </option>
      {data.map((elemnt, index) => (
        <option key={index} value={elemnt.value}>
          {elemnt.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
