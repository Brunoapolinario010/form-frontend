import './NavBar.css'

import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to={"/"} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Register</NavLink></li>
        <li><NavLink to={"/users"} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Users</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;
