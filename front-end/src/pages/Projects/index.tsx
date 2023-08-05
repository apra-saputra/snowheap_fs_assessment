import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/elements/Input";
import Table, { Columns } from "@/components/elements/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects } from "@/stores/slices/project";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/stores";
import useSweetAlert from "@/hooks/useSweetAlert";
import SelectOption from "@/components/elements/SelectOption";
import { formattedCurrency } from "@/utils/helpers";
import useDebounce from "@/hooks/useDebounce";
import Modal from "@/components/modal/Modal";
import FormProject from "./FormProject";
import { useAuth } from "@/contexts/AuthContext";
import ToggleSwitch from "@/components/elements/ToggleSwitch";
import FormAdmin from "./FormAdmin";
import { OPTIONSTATUS } from "@/utils/constants";

const Projects = () => {
  const dispatch: ThunkDispatch<RootState, any, any> = useDispatch();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [filterName, setFilterName] = useState<string>("");
  const [filterStartTarget, setFilterStartTarget] = useState<string>("");
  const [filterEndTarget, setFilterEndTarget] = useState<string>("");
  const [projectLocalId, setProjectLocalId] = useState<number>(0);

  // show modal add and edit
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);

  const { projects, totalProjects, loading, error } = useSelector(
    (state: RootState) => state.projects
  );
  const { toast, confirmBox } = useSweetAlert();
  const { userInfo, isLogin } = useAuth();

  const [showAdmin, setShowAdmin] = useState<boolean>(false);

  const variant = {
    hidden: {
      display: "hidden",
      y: -500,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      display: "block",
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const layout = {
    show: {
      height: 250,
      transition: {
        type: "tween",
        stiffness: 700,
        damping: 30,
        duration: 0.1,
      },
    },
    hidden: {
      height: 220,
      transition: {
        type: "tween",
        stiffness: 700,
        damping: 30,
        delay: 0.3,
      },
    },
  };

  const clearInput = () => {
    setFilterName("");
    setFilterEndTarget("");
    setFilterStatus("");
    setFilterStartTarget("");
  };

  const handleEditModal = (id: number) => {
    setProjectLocalId(id);
    setShowEditModal(true);
  };

  const handleShowStatusModal = (id: number) => {
    setProjectLocalId(id);
    setShowStatusModal(true);
  };

  const handleShowProgressModal = (id: number) => {
    setProjectLocalId(id);
    setShowProgressModal(true);
  };

  // using debounce
  const debouncedName = useDebounce(filterName, 1000);

  // function Handler

  const handleFetchProject = () => {
    try {
      const params: ParamsFetchProject = {
        limit: limit,
        skip: skip,
        sortBy: "id",
      };
      if (debouncedName) params.name = debouncedName;
      if (filterStatus) params.status = filterStatus;
      if (filterEndTarget && filterStartTarget) {
        params.startDate = filterStartTarget;
        params.endDate = filterEndTarget;
      }

      dispatch(fetchProjects(params));
    } catch (error) {
      toast(error as string, "error");
    }
  };

  const handleDeleteProject = async (id: number, name: string) => {
    try {
      const confrim = await confirmBox(`Delete ${name}?`);
      if (confrim.isConfirmed) {
        dispatch(deleteProject(id));
        toast("Success Delete Project", "success");
      }
    } catch (error) {
      toast(error as string, "error");
    }
  };

  // function Handler end

  useEffect(() => {
    handleFetchProject();
    return () => {};
  }, [
    limit,
    skip,
    debouncedName,
    filterStatus,
    filterStartTarget,
    filterEndTarget,
    showAddModal,
    showEditModal,
    showProgressModal,
    showStatusModal,
  ]);

  useEffect(() => {
    if (error) {
      toast(error as string, "error");
    }
    return () => {};
  }, [error]);

  const columns: Columns[] = [
    { name: "id", header: "ID", visible: false },
    { name: "name", header: "Name", styles: "min-w-[100px] p-2 text-center" },
    {
      name: "description",
      header: "Description",
      render: (item) => {
        return (
          <div className="min-w-[200px]">
            <p className="">{item.description}</p>
          </div>
        );
      },
    },
    {
      name: "status",
      header: "Status",
    },
    {
      name: "progress",
      header: "Progress",
      render: (item) => item.progress && item.progress + " %",
    },
    {
      name: "costs",
      header: "Costs",
      render: (item) => {
        return formattedCurrency(item.costs);
      },
    },
    {
      name: "target",
      header: "Target ",
      render: (item) => {
        return new Date(item.target).toLocaleDateString("id-ID");
      },
    },
    {
      name: "action",
      header: "Action",
      styles: "",
      render: (item) => {
        return (
          <div className="flex flex-col flex-wrap md:flex-row justify-center items-center gap-2 min-w-[150px]">
            <Button
              type="button"
              size="sm"
              onClick={() => handleEditModal(item.id)}
            >
              Edit
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => handleDeleteProject(item.id, item.name)}
            >
              Delete
            </Button>

            {showAdmin ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleShowProgressModal(item.id)}
                >
                  Progress
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleShowStatusModal(item.id)}
                >
                  Status
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];

  return (
    <section className="min-h-[min(100dvh-210px)] w-full flex justify-center cursor-default">
      <div className="max-w-screen-2xl w-full px-4 md:px-2 flex flex-col gap-2 md:gap-4">
        <div className="pb-2 border-b-2 border-b-accent flex justify-between">
          <h1 className="text-4xl font-semibold">Projects</h1>
          <div>
            <Button type="button" onClick={() => setShowAddModal(true)}>
              Add Project
            </Button>
          </div>
        </div>
        <div className="flex gap-2 flex-col md:flex-row justify-between">
          <motion.div
            className={`relative md:min-h-[50dvh] min-w-[300px] border-accent border-[.1rem] bg-secondary shadow-md rounded-lg overflow-hidden`}
            layout
            animate={showFilter ? "show" : "hidden"}
            variants={layout}
          >
            <motion.div
              animate={showFilter ? "show" : "hidden"}
              variants={variant}
              layout
              className="absolute z-20 h-fit w-full border-b-2 rounded-b-lg border-b-accent px-2 py-4 flex flex-col gap-2 bg-background"
            >
              <div className="flex flex-col gap-2 pt-2">
                <SelectOption
                  data={OPTIONSTATUS}
                  size="sm"
                  defautText="Status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as Status)}
                />
                <Input
                  type="text"
                  placeholder="Search Title"
                  size="sm"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="Filter Min Target"
                  size="sm"
                  value={filterStartTarget}
                  onChange={(e) => setFilterStartTarget(e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="Filter Max Target"
                  size="sm"
                  value={filterEndTarget}
                  onChange={(e) => setFilterEndTarget(e.target.value)}
                />
                {(debouncedName ||
                  filterStatus ||
                  filterEndTarget ||
                  filterStartTarget) && (
                  <div className="w-1/4 ">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => clearInput()}
                    >
                      Clear
                    </Button>
                  </div>
                )}
                <div></div>
              </div>
              <div className="w-full flex justify-center cursor-pointer my-2">
                <div className="px-2 py-1 bg-accent rounded-lg">
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    onClick={() => (setShowFilter(false), setIsHovered(false))}
                  />
                </div>
              </div>
            </motion.div>

            <div className={`w-full relative text-center cursor-pointer pt-2 z-10`}>
              <FontAwesomeIcon
                icon={faAngleDown}
                onClick={() => setShowFilter(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              >
                <div className="absolute sm:top-[30px] top-2 w-22 right-[52%] sm:right-1/2 py-1 px-2 rounded-lg bg-background opacity-90">
                  <p className="text-sm">Show Filter</p>
                </div>
              </motion.div>
            </div>

            <div
              className={`flex flex-col gap-2 px-2 ${
                showFilter ? "mt-6" : "mt-4"
              }`}
            >
              <div className="px-2 py-1 rounded-md bg-background">
                <p>total data : {totalProjects}</p>
              </div>
              <div className="px-2 py-1 rounded-md bg-background ">
                <p>account username : {userInfo?.username}</p>
              </div>
              <div className="px-2 py-1 rounded-md bg-background ">
                <p>account Role : {userInfo?.role}</p>
              </div>
              {isLogin && userInfo?.role === "ADMIN" && (
                <div
                  className={`px-2 py-1 justify-between items-center ${
                    showFilter ? "hidden" : "flex"
                  }`}
                >
                  <p>Admin Action</p>
                  <div className="text-end">
                    <ToggleSwitch isOn={showAdmin} setIsOn={setShowAdmin} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          {/* table here */}
          <Table
            dataSource={projects}
            columns={columns}
            loading={loading}
            pageInfo={{
              limit: limit,
              skip: skip,
              totalData: totalProjects,
              onLimitChange: setLimit,
              onSkipChange: setSkip,
            }}
          />
          {/* table here end*/}
        </div>
      </div>
      <Modal
        isOpen={
          showAddModal || showEditModal || showProgressModal || showStatusModal
        }
        title={showAddModal ? "Form Add Project" : "Form Edit Project"}
        onClose={() => (
          setShowAddModal(false),
          setShowEditModal(false),
          setShowProgressModal(false),
          setShowStatusModal(false)
        )}
      >
        {showStatusModal || showProgressModal ? (
          <FormAdmin
            setClose={
              showStatusModal ? setShowStatusModal : setShowProgressModal
            }
            column={showStatusModal ? "status" : "progress"}
            editDataId={projectLocalId}
          />
        ) : (
          <FormProject
            setClose={showAddModal ? setShowAddModal : setShowEditModal}
            editDataId={showEditModal ? projectLocalId : undefined}
          />
        )}
      </Modal>
    </section>
  );
};

export default Projects;
