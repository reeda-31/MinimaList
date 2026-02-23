import React from "react";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";

export default function Header(props) {
  const myStyles = {
    color: props.mode === "light" ? "black" : "white",
  };

  return (
    <div style={{ borderBottom: "1px solid grey" }}>
      <nav
        className={`navbar navbar-expand-lg navbar-{props.mode === "light" ? "dark" : "light"} bg-{props.mode === "light" ? "dark" : "light"}`}
      >
        <a className="navbar-brand" href="/" style={myStyles}>
          <b>{props.title}</b>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{
              color: props.mode === "light" ? "black" : "white",
            }}
          >
            ☰
          </span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={myStyles}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <a className="nav-link" href="/" style={myStyles}>
                <HomeIcon style={{ width: "25px", height: "25px" }} />
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/about" style={myStyles}>
                <QuestionMarkCircleIcon
                  style={{ width: "25px", height: "25px" }}
                />
              </a>
            </li>
          </ul>

          <div className="btn-group mr-2">
            <button
              type="button"
              className="btn btn-dark dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              Filter By
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="/" onClick={(e)=>{e.preventDefault();props.setFilterBy("completed")}}>
                Completed Tasks
              </a>
              <a className="dropdown-item" href="/" onClick={(e)=>{e.preventDefault();props.setFilterBy("incomplete")}}>
                 Incomplete Tasks
              </a>
              <a className="dropdown-item" href="/" onClick={(e)=>{e.preventDefault();props.setFilterBy("all")}}>
                 All Tasks
              </a>
            </div>
          </div>

          <div
            className={`custom-control custom-switch text-${
              props.mode === "light" ? "dark" : "light"
            }`}
          >
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
              onChange={props.togglemode}
              checked={props.mode === "dark"}
            />
            <label
              className="custom-control-label mr-4"
              htmlFor="customSwitch1"
            >
              {props.mode === "dark" ? (
                <SunIcon style={{ width: "25px", height: "25px" }} />
              ) : (
                <MoonIcon style={{ width: "25px", height: "25px" }} />
              )}
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
}
