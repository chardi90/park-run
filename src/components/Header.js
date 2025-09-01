import React from "react";
import logo from "./images/ch-logo-teal.png";

export default function Header() {
  return (
    <div
      className="bg-slate-800 text-white px-4 py-2"
      style={{ height: "5vh" }}
    >
      <div className="flex items-center justify-between h-full">
        <div>
          <img src={logo} alt="Chardi Logo" style={{ height: "3vh" }} />
        </div>
        <h1 className="text-sm font-bold text-teal-400 truncate">
          Great Manchester Parkrun Challenge
        </h1>
        <span className="text-xs text-gray-300">Run 'em all!</span>
      </div>
    </div>
  );
}
