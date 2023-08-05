import React, { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import useSweetAlert from "@/hooks/useSweetAlert";
import { RootState } from "@/stores";
import {
  fetchProjectById,
  updateProgressProject,
  updateStatusProject,
} from "@/stores/slices/project";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import SelectOption from "@/components/elements/SelectOption";
import { OPTIONSTATUS } from "@/utils/constants";

interface FormAdminModal {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  column?: "progress" | "status";
  editDataId?: number;
}

const FormAdmin: React.FC<FormAdminModal> = ({
  setClose,
  column,
  editDataId,
}) => {
  const dispatch: ThunkDispatch<RootState, any, any> = useDispatch();
  const { confirmBox, toast } = useSweetAlert();
  const { project, loading } = useSelector(
    (state: RootState) => state.projects
  );

  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<string>("");

  const handleUpdateStatusById = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const confrim = await confirmBox(`Update?`);
      if (confrim.isConfirmed) {
        dispatch(updateStatusProject(Number(editDataId), status));
        setClose(false);
        toast("Success Update Status Project", "success");
      }
    } catch (error) {
      toast(error as string, "error");
    }
  };

  const handleUpdateProgressById = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const confrim = await confirmBox(`Update?`);
      if (confrim.isConfirmed) {
        dispatch(updateProgressProject(Number(editDataId), Number(progress)));
        setClose(false);
        toast("Success Update Progrees Project", "success");
      }
    } catch (error) {
      toast(error as string, "error");
    }
  };

  useEffect(() => {
    if (editDataId) {
      dispatch(fetchProjectById(editDataId));
    }
    return () => {};
  }, [editDataId]);

  useEffect(() => {
    if (editDataId && project?.id === editDataId && !loading) {
      setProgress(project.progress ? project.progress.toString() : "0");
      setStatus(project.status);
    }

    return () => {};
  }, [project, editDataId, loading]);

  if (loading) {
    return (
      <div className="w-full min-h-[300px] px-2 pb-4 pt-2 flex justify-center items-center">
        <PropagateLoader color="var(--accent)" />
      </div>
    );
  }

  return (
    <div className="px-2 pb-4 pt-2 md:w-[500px]">
      <form
        className="flex flex-col gap-2"
        onSubmit={
          column === "progress"
            ? handleUpdateProgressById
            : handleUpdateStatusById
        }
      >
        <div className="px-1">
          <h1>Admin Page</h1>
          <p>progress item</p>
        </div>
        {column === "progress" ? (
          <Input
            type="text"
            placeholder="name"
            size="sm"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          />
        ) : (
          <SelectOption
            data={OPTIONSTATUS}
            defautText="status"
            size="sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FormAdmin;
