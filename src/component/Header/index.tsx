/* eslint-disable jsx-a11y/anchor-is-valid */
import { LogoutOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import "./Header.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React from 'react';

function Header() {
  const navigate = useNavigate();

  const navigateModalPage = () => {
    navigate("/modal")
  }

  const onPressLogOut = async () => {
    try {
      const user = getAuth();
      await signOut(user);
      navigate("/login");
    } catch (e) {}
  };

  return (
    <div>
      <PageHeader
        className="site-page-header-ghost-wrapper"
        extra={[
            <><p className="p">Dashboard </p><LogoutOutlined
            onClick={onPressLogOut}
            rotate={270}
            style={{ fontSize: "32px" }}
          ></LogoutOutlined></>
        ]}
      >
        <div className="top-bar">
        <PlusCircleOutlined 
        onClick={navigateModalPage}/>
          {" "}
          <a href="/Projects" className="p1">
            {" "}
            Projects{" "}
          </a>
        </div>
      </PageHeader>
    </div>
  );
}

export default Header;
