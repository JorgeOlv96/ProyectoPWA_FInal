import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom"; 
import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Inicio',
        icon: <i className='bx bx-home'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Perfil',
        icon: <i className='bx bx-user'></i>,
        to: '/user',
        section: 'user'
    },
    {
        display: 'Gestor',
        icon: <i className='bx bx-receipt'></i>,
        to: '/order',
        section: 'order'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
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
        </div>
      </div>
    );
};

export default Sidebar;
