import React, { useEffect, useState, useContext } from "react";
import { Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import "../page/ProjectPage.css";
import { db } from "../firebase/index";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { GlobalContext } from "../context";

interface ProjectModel {
  submit: string | number | readonly string[] | undefined;
  length: number;
  id: string;
  name: string;
  completed: boolean;
}

function ProjectList() {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [project, setProject] = useState("");
  const [projectEditing, setProjectEditing] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [projectListUpdated, setProjectListUpdated] = useState(false);

  const globalContext = useContext(GlobalContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("bbbbbbbb ", globalContext);
    const ref = collection(db, "logTracker");
    addDoc(ref, {
      name: project,
      userId: globalContext.user?.userId,
    });
    setProjectListUpdated(!projectListUpdated);
    setProject("");
  };

  useEffect(() => {
    getDocs(collection(db, "logTracker")).then((snapshot) => {
      const projectData: any = [];
      snapshot.forEach((doc) =>
        projectData.push({ ...doc.data(), id: doc.id })
      );
      setProjects(projectData);
    });
  }, [projectListUpdated]);

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, "logTracker", id));
    setProjectListUpdated(!projectListUpdated);
  };

  const submitEdits = async (id: string): Promise<void> => {
    const ref = doc(db, "logTracker", id);

    await updateDoc(ref, {
      name: editingText,
    });

    setProjectListUpdated(!projectListUpdated);
    setProject("");
    setProjectEditing(null);
  };

  return (
    <div id="project-list">
      <form onSubmit={handleSubmit} className="add-form">
        <Input
          placeholder="Add Project"
          bordered={false}
          type="text"
          onChange={(e) => setProject(e.target.value)}
          value={project}
        />
        <Button
          disabled={project.length < 1}
          type="primary"
          icon={<PlusCircleFilled />}
          htmlType="submit"
        />
      </form>
      {projects.map((project, index) => (
        <div key={index} className="project">
          <div className="project-text">
            {project.id === projectEditing ? (
              <Input
                bordered={false}
                value={project.submit}
                placeholder={project.name}
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{project.name}</div>
            )}
          </div>
          <div>
            {project.id === projectEditing ? (
              <Button
                disabled={!editingText}
                onClick={() => submitEdits(project.id)}
              >
                Submit Edits
              </Button>
            ) : (
              <Button onClick={() => setProjectEditing(project.id)}>
                Edit
              </Button>
            )}
            <Button onClick={() => deleteProject(project.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
