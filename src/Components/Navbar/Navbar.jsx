import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";

const Navbar = ({ setSidebar }) => {
  return (
    <nav className="navbar flex-div">
      {/* Left Section */}
      <div className="nav-left flex-div">
        {/* ✅ Make menu icon clickable */}
        <button className="menu-btn" onClick={() => setSidebar(prev => !prev)}>
          <img src={menu_icon} alt="Menu" className="menu-icon" />
        </button>
       <Link to='/'><img src={logo} alt="" className="logo" /></Link> 
      </div>

      {/* Middle Section */}
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img src={search_icon} alt="Search" />
        </div>
      </div>

      {/* Right Section */}
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More" />
        <img src={notification_icon} alt="Notifications" />
        <img src={profile_icon} className="user_icon" alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
