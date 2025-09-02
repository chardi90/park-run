import React from "react";
import logo from "./images/ch-logo-teal.png";

export default function Footer() {
  return (
    <div
      className="bg-gray-800 text-white px-4 py-2 text-center sticky bottom-0"
      style={{ height: "5vh" }}
    >
      <div className="flex items-center justify-center h-full text-xs">
        <div>
          Coded by{" "}
          <a
            href="https://www.chardi.co.uk/"
            target="_blank"
            rel="noreferrer"
            className="text-teal-400 hover:underline"
          >
            Chardi
          </a>
          .{" "}
        </div>
        <div>
          <img
            src={logo}
            alt="Chardi Logo"
            style={{ height: "3vh" }}
            className="px-4"
          />
        </div>
        <div>
          Open-sourced on{" "}
          <a
            href="https://github.com/chardi90/"
            target="_blank"
            rel="noreferrer"
            className="text-teal-400 hover:underline"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </div>
  );
}
