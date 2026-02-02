import { Menu } from "antd";
import {
  ScissorOutlined,
  UserOutlined,
  ProfileOutlined,
  AppstoreOutlined,
  UserSwitchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SuperAdminSidebar = () => {
  const location = useLocation();

  return (
    <div
      className="
        fixed md:px-2.5 py-5 flex flex-col justify-between h-screen 
        w-16 md:w-55 border-r border-r-[#262b3a]
      "
    >
      <div>
        <div className="flex gap-3 items-center justify-center mb-6">
          <div className="bg-[#6c5ce7] p-2.5 rounded-xl">
            <ScissorOutlined style={{ fontSize: 22, color: "#fff" }} />
          </div>

          <div className="hidden md:block">
            <h1 className="text-white m-0">SalonHub</h1>
            <span className="text-[#9ca3af] text-xs">Booking System</span>
          </div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{
            background: "transparent",
            border: "none",
            color: "#dbd4d3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="w-full"
          items={[
            {
              key: "/superadmin",
              icon: <AppstoreOutlined style={{ color: "#dbd4d3" }} />,
              label: <NavLink to="/superadmin">Dashboard</NavLink>,
            },
            {
              key: "/superadmin/salons",
              icon: <HomeOutlined style={{ color: "#dbd4d3" }} />,
              label: <NavLink to="/superadmin/salons">Salons</NavLink>,
            },
            {
              key: "/superadmin/salonsreq",
              icon: <ProfileOutlined style={{ color: "#dbd4d3" }} />,
              label: <NavLink to="/superadmin/salonsreq">Requests</NavLink>,
            },
            {
              key: "/superadmin/users",
              icon: <UserSwitchOutlined style={{ color: "#dbd4d3" }} />,
              label: <NavLink to="/superadmin/users">Users</NavLink>,
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2 px-2 md:px-0">
        <NavLink
          to="/superadmin/profile"
          className="bg-[#333241] rounded-lg p-3 flex items-center gap-3 justify-center md:justify-start"
        >
          <UserOutlined style={{ fontSize: 36, color: "#6c5ce7" }} />

          <div className="hidden md:block">
            <span style={{ color: "#fff", fontSize: 16 }}>Super Admin</span>
            <br />
            <span style={{ color: "#9ca3af", fontSize: 12 }}>
              Active Session
            </span>
          </div>
        </NavLink>

        <Link
          to="/salonadmin"
          className="text-red-400/50 bg-[#262b3a] rounded-xl flex items-center justify-center gap-2 py-2"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span className="hidden md:inline">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;