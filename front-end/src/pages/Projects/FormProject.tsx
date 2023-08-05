import React, { useState, useEffect } from "react";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import TextArea from "@/components/elements/TextArea";
import { useDispatch, useSelector } from "react-redux";
import useSweetAlert from "@/hooks/useSweetAlert";
import {
  createProject,
  fetchProjectById,
  updateProjects,
} from "@/stores/slices/project";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@/stores";
import { formattedDateInput } from "@/utils/helpers";
import { PropagateLoader } from "react-spinners";

interface FormAddModal {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  editDataId?: number;
}

const FormProject: React.FC<FormAddModal> = ({ setClose, editDataId }) => {
  const dispatch: ThunkDispatch<RootState, any, any> = useDispatch();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [costs, setCosts] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const { toast } = useSweetAlert();
  const { project, loading } = useSelector(
    (state: RootState) => state.projects
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setClose(false);
      dispatch(
        createProject({ costs: Number(costs), description, name, target })
      );
      toast(`Success Create Project`, "success");
    } catch (error) {
      toast(error as string, "error");
    }
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setClose(false);
      dispatch(
        updateProjects(Number(editDataId), {
          costs: Number(costs),
          description,
          name,
          target,
        })
      );
      toast(`Success Edit Project`, "success");
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
    if (editDataId && project?.id === editDataId) {
      setName(project.name);
      setDescription(project.description);
      setCosts(project.costs.toString());
      setTarget(formattedDateInput(project.target));
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
        onSubmit={editDataId ? handleEdit : handleAdd}
      >
        <Input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder={"Costs"}
          value={costs}
          onChange={(e) => setCosts(e.target.value)}
        />
        <Input
          type="date"
          placeholder="target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default FormProject;
