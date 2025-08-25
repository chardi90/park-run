import React from "react";
import "./HeaderFooter.css";

export default function Footer() {
  return (
    <div className="Footer">
      Coded by{" "}
      <a href="https://www.chardi.co.uk/" target="_blank" rel="noreferrer">
        Chardi
      </a>
      , open-sourced on{" "}
      <a href="https://github.com/chardi90/" target="_blank" rel="noreferrer">
        Github
      </a>{" "}
      and hosted on{" "}
      <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">
        Netlify
      </a>
      .
    </div>
  );
}
