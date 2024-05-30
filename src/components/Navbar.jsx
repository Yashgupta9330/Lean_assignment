import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userPlaceholder from "../assets/user.png";
import Down from "../components/Down";
import { Link } from "react-router-dom";
import { setToken, setUser } from "../slices/AuthSlice";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="navbar">
      <nav className="inside">
        <div className="left">
          <span>THE</span>
          <div className="special">PRODUCT</div>
          <span>PLATFORM</span>
        </div>
        <div className="right">
          <div className="down">
            <Down text="Learn" />
            <Down text="practice" />
          </div>
          {user ? (
            <div className="user-info">
              <div className="user" onClick={() => setShowDropdown(!showDropdown)}>
                <img src={user.image || userPlaceholder} alt="user"  className="user" style={{zIndex:1000}}/>
                {showDropdown && (
                    <button onClick={handleLogout} className="redux">Logout</button>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="redux" style={{top:"2em"}}>login</button>
           </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
