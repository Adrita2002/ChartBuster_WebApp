import React from "react";
import "./header.css";
import Logo from "../Images/logo.png";
import Icon from "../Images/icon.png";
const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <img src={Logo} onClick={()=>window.scroll(0,0)} />
      </div>
      <img className="icon" src={Icon} />
    </div>
  );
};

export default Header;
