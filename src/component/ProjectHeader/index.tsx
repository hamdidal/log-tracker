/* eslint-disable jsx-a11y/anchor-is-valid */
import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React from "react";
import "./ProjectHeader.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function ProjectHeader() {
  const navigate = useNavigate();

  const onPressLogOut = async () => {
    try {
      const user = getAuth();
      await signOut(user);
      navigate("/");
    } catch (e) {}
  };

  return (
    <div>
      <PageHeader
        className="site-page-header-ghost-wrapper"
        extra={[
            <HomeOutlined
            className="out-home"
            onClick={onPressLogOut}
            ></HomeOutlined>
        ]}
      >
         <p className="paragraph">Projects </p>
      </PageHeader>
    </div>
  );
}

export default ProjectHeader;
