import React from "react";
import { Button } from "antd";
import "./Header.css";
import { withRouter } from "react-router";

function HeaderPresentational(props) {

  const buttonStyle = {
    
  
  };

  const { logout, routeTo } = props;
  let conditionalButtons = function() {
    let token = localStorage.getItem("inspectacyjwt");
    if (token) {
      return (
        <div className="header-btn">
          <Button  className="logout header-btns" onClick={logout} style={buttonStyle}>
            Logout
          </Button>
          <Button className="header-btns" onClick={()=>{routeTo("userProfile")}} style={buttonStyle}>
            Profile
          </Button>
        </div>
      );
    } else {
      return (
        <div className="header-btn">
          <Button className="header-btns" onClick={()=>routeTo("register")} style={buttonStyle}>
            Register
          </Button>
          
          <Button className="header-btns" onClick={()=>routeTo("login")} style={buttonStyle}>
            Login
          </Button>
        </div>
      );
    }
  };

  return (
    <>
    
    <header>
      
      <div className="header-container">
      <div className="inspect-logo"></div>
      <a href="/"><h3 className="site-title linear-wipe">Inspectacy</h3></a>
        <div />
        {conditionalButtons()}
      </div>
    </header>
    
    </>
  );
}
export default withRouter(HeaderPresentational);
