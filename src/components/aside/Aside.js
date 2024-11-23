import React, { useState, useEffect } from "react";
import "./aside.scss";

import logo from "../../assets/images/Group.png";
import logos from "../../assets/images/stack.png";
import { IoIosHome } from "react-icons/io";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { GiSchoolBag } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Aside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const sidebar = document.querySelector("aside");
    const sidebarToggle = document.querySelector(".hamburger");

    if (sidebarToggle) {
      const handleToggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
      };

      sidebarToggle.addEventListener("click", handleToggleSidebar);

      return () => {
        sidebarToggle.removeEventListener("click", handleToggleSidebar);
      };
    }
  }, []);

  useEffect(() => {
    const sidebar = document.querySelector("aside");

    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setIsSidebarOpen(false);
        sidebar?.classList.add("close");
      } else {
        setIsSidebarOpen(true);
        sidebar?.classList.remove("close");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside className={isSidebarOpen ? "" : "close"}>
      <nav>
        <NavLink to={"/admin"} className="logo-link">
          <img className="title" src={logo} alt="Logo" />
          <img
            style={{ maxWidth: "40px" }}
            className="close-title"
            src={logos}
            alt="Logo small"
          />
        </NavLink>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={"main"}
            >
              <IoIosHome style={{ fontSize: "22px" }} />{" "}
              <div className="title">Asosiy</div>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"test"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <FaRegNoteSticky style={{ fontSize: "22px" }} />{" "}
              <div className="title">Mening testlarim</div>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaGraduationCap/> Mening olimpiad
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <GiSchoolBag /> Mening sinflarim
            </NavLink>
          </li> */}
        </ul>
      </nav>
      <div className="bottom-list">
        {/* <button className="mode-btn">
          <IoSettingsSharp />
          <span>Settings</span>
        </button> */}
        <button className="logout-btn">
          <LuLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Aside;
