import useSweetAlert from "@/hooks/useSweetAlert";
import { RootState } from "@/stores";
import { fetchProjects } from "@/stores/slices/project";
import { useEffect, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { BarLoader } from "react-spinners";
import { fetchDashboard } from "@/stores/slices/dashboard";
import SelectOption from "@/components/elements/SelectOption";
import { formattedCurrency } from "@/utils/helpers";
import Chart from "./component/Chart";

export default function Home() {
  const dispatch: ThunkDispatch<RootState, any, any> = useDispatch();

  const { projects, error } = useSelector((state: RootState) => state.projects);
  const {
    error: errorDashboard,
    progress,
    statistic,
  } = useSelector((state: RootState) => state.dashboard);

  const { toast } = useSweetAlert();

  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [selectedStatus, setSelectedStatus] = useState<Status>("ONPROGRESS");

  useEffect(() => {
    dispatch(
      fetchProjects({
        limit: 4,
        skip: 0,
        sortBy: "costs",
        status: "DONE",
      })
    );

    dispatch(
      fetchDashboard(
        selectedYear,
        selectedStatus ? selectedStatus : "ONPROGRESS"
      )
    );

    if (error) toast(error, "error");
    if (errorDashboard) toast(error, "error");
    return () => {};
  }, [dispatch, selectedYear, selectedStatus]);

  const years = [
    { value: 2023, name: "2023" },
    { value: 2024, name: "2024" },
    { value: 2025, name: "2025" },
  ];

  const status = [
    { value: "DONE", name: "DONE" },
    { value: "ONPROGRESS", name: "ONPROGRESS" },
    { value: "PENDING", name: "PENDING" },
  ];

  return (
    <section className="h-full w-full flex justify-center">
      <div className="max-w-screen-2xl w-full">
        <div
          id="banner"
          className="min-h-screen relative bg-no-repeat bg-center bg-cover image-container"
          style={{ backgroundImage: "url(https://placeholder.co/1600x768)" }}
        >
          <div className="absolute z-0 bg-transparent h-full px-2 md:px-8">
            <div className="h-full flex flex-col justify-center items-start gap-2">
              <h1 className="text-4xl font-bold pb-2 border-b-2 border-accent">
                Welcome To AI Project
              </h1>
              <p>
                sebuat website untuk mengurus dan memerika laporan dari project
                yang tersedia.
              </p>
            </div>
          </div>
        </div>

        <div
          id="4-top-project"
          className="min-h-[600px] w-full flex flex-col justify-center gap-4 px-2 md:px-0 py-16"
        >
          <div>
            <h1 className="text-2xl font-bold pb-2 border-b-2 border-accent">
              Statistic
            </h1>
          </div>
          <Suspense fallback={<BarLoader color="#36d7b7" />}>
            <ul className="flex flex-row flex-wrap justify-center items-center gap-4">
              {projects.map((project, index) => (
                <li
                  className="w-[160px] h-[260px] bg-secondary shadow-lg rounded-lg overflow-hidden"
                  id="card"
                  key={index}
                >
                  <div className="">
                    <img
                      src="https://placeholder.co/200x200"
                      alt="Project Logo"
                    />
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Suspense>
          <Suspense fallback={<BarLoader color="#36d7b7" />}>
            <div className="px-4 py-6 rounded-lg bg-secondary shadow-lg mt-2">
              <div className="flex md:justify-end justify-center w-full">
                <div className="flex gap-2 w-full md:w-1/3">
                  <SelectOption
                    data={years}
                    defautText="Pilih Tahun"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  />
                  <SelectOption
                    data={status}
                    defautText="Pilih Status"
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(e.target.value as Status)
                    }
                  />
                </div>
              </div>
              <div className="hidden sm:block h-fit w-full mt-2">
                <Chart data={progress} />
              </div>
              {statistic && (
                <div className="flex flex-row flex-wrap justify-center items-center gap-4 mt-4">
                  <div className="w-[220px] rounded-lg overflow-hidden bg-background flex flex-col items-center">
                    <div className="w-full text-center bg-primary py-1">
                      <h1 className="uppercase">min costs</h1>
                    </div>
                    <div className="p-2 min-h-[70px] flex flex-col justify-center">
                      <p>Project Name : {statistic.minCosts.name}</p>
                      <p>
                        costs : {formattedCurrency(statistic.minCosts.costs)}
                      </p>
                    </div>
                  </div>
                  <div className="w-[220px] rounded-lg overflow-hidden bg-background flex flex-col items-center">
                    <div className="w-full text-center bg-primary py-1">
                      <h1 className="uppercase">max costs</h1>
                    </div>
                    <div className="p-2 min-h-[70px] flex flex-col justify-center">
                      <p>Project Name : {statistic.maxCosts.name}</p>
                      <p>
                        costs : {formattedCurrency(statistic.maxCosts.costs)}
                      </p>
                    </div>
                  </div>
                  <div className="w-[220px] rounded-lg overflow-hidden bg-background flex flex-col items-center">
                    <div className="w-full text-center bg-primary py-1">
                      <h1 className="uppercase">avg costs</h1>
                    </div>
                    <div className="p-2 min-h-[70px] flex flex-col justify-center">
                      <p>costs : {formattedCurrency(statistic.avgCosts)}</p>
                    </div>
                  </div>
                  <div className="w-[220px] rounded-lg overflow-hidden bg-background flex flex-col items-center">
                    <div className="w-full text-center bg-primary py-1">
                      <h1 className="uppercase">total costs</h1>
                    </div>
                    <div className="p-2 min-h-[70px] flex flex-col justify-center">
                      <p>costs : {formattedCurrency(statistic.totalCosts)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
