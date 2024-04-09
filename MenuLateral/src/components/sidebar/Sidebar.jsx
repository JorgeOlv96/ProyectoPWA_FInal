import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import appFirebase from "../../credenciales";
import { getAuth, signOut } from "firebase/auth";
import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";

const auth = getAuth(appFirebase);

const sidebarNavItems = [
  {
    display: "Inicio",
    icon: <HomeIcon />,
    to: "/",
    section: "",
  },
  {
    display: "Perfil",
    icon: <PersonIcon />,
    to: "/user",
    section: "user",
  },
  {
    display: "Gestor",
    icon: <ReceiptIcon />,
    to: "/order",
    section: "order",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img
          src="https://expreso.blob.core.windows.net.optimalcdn.com/images/2023/03/27/natanaelcano-89d35fda-focus-0-0-1300-865.jpg"
          alt="Foto de perfil"
          style={{
            maxWidth: "100%",
            height: "auto",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index} style={{ textDecoration: "none" }}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
        <div
          className="sidebar__menu__item active cerrar-sesion"
          style={{ cursor: "pointer", marginTop: 5}}
          onClick={() => signOut(auth)}
        >
          <div className="sidebar__menu__item__icon">
            <LogoutIcon />
          </div>
          <div
            className="sidebar__menu__item__text"
          >
            Cerrar sesión
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
