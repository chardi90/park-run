import React from "react";
import logo from "./images/park-run-logo.jpg";

export default function Header() {
  return (
    <div
      className="bg-slate-800 text-white px-4 py-2"
      style={{ height: "5vh" }}
    >
      <div className="flex items-center justify-between h-full">
        <div>
          <img src={logo} alt="Parkrun Logo" style={{ height: "3vh" }} />
        </div>
        <h1 className="text-sm font-bold text-teal-400 truncate">
          GREATER MANCHESTER PARKRUNS
        </h1>
        <span className="text-xs text-my-accent-colour-300">Run 'em all!</span>
      </div>
    </div>
  );
}
