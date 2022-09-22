/* eslint-disable jsx-a11y/anchor-is-valid */
import { LogoutOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import "./Header.css";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const navigateModalPage = () => {
    navigate("/adddiary");
  };

  const onPressLogOut = async () => {
    try {
      const user = getAuth();
      await signOut(user);
      navigate("/login");
    } catch (e) {}
  };

  return (
    <div className="header-div">
      <PageHeader
        className="site-page-header-ghost-wrapper"
        extra={[
          <>
            <p className="p">Dashboard </p>
            <LogoutOutlined
              onClick={onPressLogOut}
              rotate={270}
              style={{ fontSize: "32px", marginTop: "10px" }}
            ></LogoutOutlined>
          </>,
        ]}
      >
        <div className="top-bar">
          <PlusCircleOutlined onClick={navigateModalPage} />{" "}
          <Link to="/Projects" className="p1">
            {" "}
            Projects{" "}
          </Link>
        </div>
      </PageHeader>
    </div>
  );
}

export default Header;
