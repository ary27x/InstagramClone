import React, { useContext, useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import axios from "axios";

function Header() {
  const { tokenExists, signOut } = useContext(Context);

  const notExists = (
    <nav className="">
      <div
        className="nav-wrapper #fffff white
"
      >
        <a href="#" className="brand-logo logo" style={{ color: "black" }}>
          Instagram
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/signin" style={{ color: "black" }}>
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/signup" style={{ color: "black" }}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
  const exists =
    window.innerWidth < 1000 ? (
      <React.Fragment>
        <nav className="top-thing">
          <div
            className="nav-wrapper #ffffff white
"
          >
            <a href="#" className="brand-logo logo" style={{ color: "black" }}>
              Instagram
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/" style={{ color: "black" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" style={{ color: "black" }}>
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: "black" }}>
                  Profile
                </Link>
              </li>

              <li className="#d50000 red accent-4" onClick={signOut}>
                <Link to="/signin" style={{ color: "white" }}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="my-menu">
          <div className="my-menu-flex">
            <Link to="/">
              <i class="material-icons acc-icon">home</i>
            </Link>
            <Link to="/explore">
              <i class="material-icons acc-icon">explore</i>
            </Link>
            <Link to="/new">
              <i class="material-icons acc-icon">add_box</i>
            </Link>
            <Link to="/settings">
              <i class="material-icons acc-icon">settings</i>
            </Link>
            <Link to="/profile">
              <i class="material-icons acc-icon">account_circle</i>
            </Link>
          </div>

          <p></p>
        </div>
      </React.Fragment>
    ) : (
      <nav className="top-thing">
        <div
          className="nav-wrapper #ffffff white
"
        >
          <a href="#" className="brand-logo logo" style={{ color: "black" }}>
            Instagram
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/" style={{ color: "black" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" style={{ color: "black" }}>
                Explore
              </Link>
            </li>
            <li>
              <Link to="/new" style={{ color: "black" }}>
                New Post
              </Link>
            </li>
            <li>
              <Link to="/settings" style={{ color: "black" }}>
                Settings
              </Link>
            </li>

            <li>
              <Link to="/profile" style={{ color: "black" }}>
                Profile
              </Link>
            </li>
            <li className="#d50000 red accent-4" onClick={signOut}>
              <Link to="/signin" style={{ color: "white" }}>
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );

  return <React.Fragment>{tokenExists ? exists : notExists}</React.Fragment>;
}
export default Header;
