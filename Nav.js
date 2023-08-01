import React from "react";
import {Link} from "react-router-dom";

const Nav=()=>{
    return (
        <nav className="navbar">
            <div className="left">
                <Link className="menu" to={"/"}>3d model</Link>
                <Link className="menu" to={"/chart"}>chart</Link>
            </div>
            <div className="right">
                <Link className="menu-login" to={"/login"}>Login</Link>
            </div>
        </nav>
    )
}

export default Nav;