import React from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { generateArray } from "@/utils/helpers";
import SelectOption from "./SelectOption";

interface TableProps {
  backgroundHead?: string;
  background?: string;
  color?: string;
  dataSource: Record<string, any>[];
  columns: Columns[];
  loading?: boolean;
  pageInfo?: {
    limit: number;
    skip: number;
    totalData: number;
    onSkipChange: React.Dispatch<React.SetStateAction<number>>;
    onLimitChange: React.Dispatch<React.SetStateAction<number>>;
  };
}

export type Columns = {
  name: string;
  header: string;
  visible?: boolean;
  styles?: React.HTMLAttributes<HTMLDivElement>["className"];
  render?: (any?: any) => React.ReactNode;
};

type actionPage = "NEXT" | "PREV";

const Table: React.FC<TableProps> = ({
  dataSource,
  columns,
  loading,
  color,
  background,
  backgroundHead,
  pageInfo,
}) => {
  const listPage = generateArray(
    pageInfo ? Math.floor(pageInfo.totalData / pageInfo.limit) : 5
  ).map((nmbr) => ({ value: nmbr, name: nmbr.toString() }));

  const currentPage = pageInfo ? pageInfo.skip + 1 : 1;

  const listLimit = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 15, name: "15" },
    { value: 20, name: "20" },
  ];

  const handleNavigateButton = (action: actionPage) => {
    const totalPage = pageInfo
      ? Math.floor(pageInfo.totalData / pageInfo.limit)
      : 5;

    if (action === "NEXT" && currentPage + 1 !== totalPage + 1) {
      pageInfo?.onSkipChange((state) => state + 1);
    }
    if (action === "PREV" && currentPage - 1 !== 0) {
      pageInfo?.onSkipChange((state) => state - 1);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg sm:w-full md:min-w-[768px] h-fit">
      {loading ? (
        <div className="w-full min-h-[400px] flex justify-center items-center">
          <h2>loading...</h2>
        </div>
      ) : (
        <table
          className={`w-full text-sm text-left ${
            color ? "text-" + color : "text-inherit"
          }`}
        >
          <thead
            className={`text-base ${
              backgroundHead ? "bg-" + backgroundHead : "bg-primary"
            }`}
          >
            <tr>
              {columns.length &&
                columns.map((item, index) => {
                  return (
                    (typeof item.visible === "undefined" || item.visible) && (
                      <th
                        className={`${item.styles ? item.styles : "px-6 py-4"}`}
                        key={index}
                      >
                        {item.header}
                      </th>
                    )
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {dataSource.length ? (
              dataSource.map((obj, index) => {
                return (
                  <tr
                    className={`${
                      background ? "bg-" + background : "bg-white"
                    }  border-b  hover:brightness-75 dark:hover:bg-gray-600`}
                    key={index}
                  >
                    {columns.length &&
                      columns.map((item, idx) => {
                        return (
                          (typeof item.visible === "undefined" ||
                            item.visible) && (
                            <td
                              className={`${
                                item.styles ? item.styles : "px-4 py-4"
                              }`}
                              key={idx}
                            >
                              {typeof item.render === "undefined"
                                ? obj[item.name]
                                : item.render(obj)}
                            </td>
                          )
                        );
                      })}
                  </tr>
                );
              })
            ) : (
              <tr className="h-full w-full flex justify-center items-center text-center">
                <td className="text-2xl">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {pageInfo && (
        <div className="md:w-full min-w-[800px] overflow-x-auto flex justify-between px-6 py-4 bg-secondary">
          <div className="flex gap-1 items-center flex-row ">
            <Button
              type="button"
              size="sm"
              onClick={() => handleNavigateButton("PREV")}
              disable={currentPage - 1 !== 0 ? false : true}
              className="w-full"
            >
              <FontAwesomeIcon icon={faArrowLeft} color="inherit" />{" "}
              <span>prev</span>
            </Button>
            <SelectOption
              data={listPage}
              value={pageInfo.skip + 1}
              onChange={(e) => pageInfo.onSkipChange(Number(e.target.value))}
              defautText="Page"
              size="sm"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => handleNavigateButton("NEXT")}
              disable={
                currentPage + 1 !==
                Math.floor(pageInfo.totalData / pageInfo.limit) + 1
                  ? false
                  : true
              }
              className="w-full"
            >
              <span>next</span>{" "}
              <FontAwesomeIcon icon={faArrowRight} color="inherit" />
            </Button>
          </div>
          <div className="flex gap-1 items-center">
            <p>limit</p>
            <SelectOption
              data={listLimit}
              value={pageInfo.limit}
              onChange={(e) => pageInfo.onLimitChange(Number(e.target.value))}
              defautText="Limit"
              size="sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
