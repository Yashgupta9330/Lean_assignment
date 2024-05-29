import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing useSelector
import userPlaceholder from "../assets/user.png";
import Down from "../components/Down";
import { Link } from "react-router-dom";
import { setToken, setUser } from "../slices/AuthSlice";

export default function Navbar() {
  // Extracting user from Redux store
  const user = useSelector((state) => state.auth.user);
  const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
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
              <img src={user.image || userPlaceholder} alt="user" width={50} height={50} style={{ borderRadius: "50%" }}/>
              <button onClick={handleLogout} className="redux">Logout</button>
            </div>
          ) : (
            <Link to="/login"><button className="redux">Login</button></Link> // Render login button if user does not exist
          )}
        </div>
      </nav>
    </div>
  );
}
