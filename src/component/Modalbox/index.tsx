import { CloseCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Select, Button, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import "./ModalBox.css";

interface ProjectModel {
  submit: string | number | readonly string[] | undefined;
  length: number;
  id: string;
  name: string;
  completed: boolean;
  description: string;
}
export const ModalBox = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [description, setDescription] = useState("");
  const [difference, setDifference] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ref = collection(db, "diaryLog");
    addDoc(ref, {
      description: description,
      difference: difference,
      start: start,
      end: end,
    });
    setDescription("");
  };

  const { Option } = Select;

  const handleTimeChange = (values: any) => {
    const startDate = new Date(values[0]._d);
    const endDate = new Date(values[1]._d);

    const diff = endDate.getTime() - startDate.getTime();
    const diffHrs = Math.floor((diff % 86400000) / 3600000);
    const diffMins = Math.floor(((diff % 86400000) % 3600000) / 60000);
    setDifference(`${diffHrs}:${diffMins}`);

    setStart(startDate.toLocaleString());
    setEnd(endDate.toLocaleString());
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const navigate = useNavigate();

  const toCancel = () => {
    navigate("/");
  };

  useEffect(() => {
    getDocs(collection(db, "logTracker")).then((snapshot) => {
      const projectData: any = [];
      snapshot.forEach((doc) =>
        projectData.push({ ...doc.data(), id: doc.id })
      );
      setProjects(projectData);
      console.log(projectData);
    });
  }, []);
  return (
    <form onSubmit={handleSubmit} className="form-modal">
      <h2>Add Diary</h2>
      <p className="project-p">Project Name</p>
      <Select
        onChange={handleChange}
        placeholder="Select your project"
        className="select-modal"
      >
        {projects.map((doc) => (
          <Option value={projects.values}>{doc.name}</Option>
        ))}
      </Select>
      <div className="description-modal">
        <h3>Description</h3>
        <TextArea
          className="description-input"
          placeholder="Please say something"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          maxLength={500}
        />
      </div>
      <div className="description-modal">
        <h3>Start Time</h3>
        <TimePicker.RangePicker onChange={handleTimeChange} />
        {difference && <h3>Difference: {difference}</h3>}
      </div>
      <Button
        className="description-button"
        disabled={description.length < 1}
        type="primary"
        htmlType="submit"
      >
        <PlusCircleFilled />
      </Button>
      <Button
        className="cancel-button"
        disabled={description.length > 1}
        type="primary"
        onClick={toCancel}
      >
        <CloseCircleFilled />
      </Button>
    </form>
  );
};
