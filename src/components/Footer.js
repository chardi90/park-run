import React from "react";

export default function Footer() {
  return (
    <div
      className="bg-gray-800 text-white px-4 py-2 text-center sticky bottom-0"
      style={{ height: "5vh" }}
    >
      <div className="flex items-center justify-center h-full">
        <span className="text-xs">
          By{" "}
          <a
            href="https://www.chardi.co.uk/"
            target="_blank"
            rel="noreferrer"
            className="text-teal-400 hover:underline"
          >
            Chardi
          </a>
          . Open-sourced on{" "}
          <a
            href="https://github.com/chardi90/"
            target="_blank"
            rel="noreferrer"
            className="text-teal-400 hover:underline"
          >
            Github
          </a>{" "}
          .
        </span>
      </div>
    </div>
  );
}
