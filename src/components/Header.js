import React from "react";
import "./HeaderFooter.css";
import logo from "./images/ch-logo-teal.png";

export default function Header() {
  return (
    <div className="Header">
      <div>
        <img src={logo} alt="Chardi Logo" className="logo" />
      </div>
      <div className="heading">
        <h1>Great Manchester Parkrun Challenge</h1>
        <h2>Run, run, run! Can you catch 'em all?</h2>
      </div>
    </div>
  );
}
