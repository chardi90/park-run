import React from "react";

export default function ProgressBar({ completed, total }) {
  const percentage =
    total > 0 ? Math.round((completed.length / total) * 100) : 0;

  const getMotivationalPhrase = (percent) => {
    if (percent === 0) return "Ready to start?";
    if (percent <= 10) return "Good start!";
    if (percent <= 20) return "Building momentum";
    if (percent <= 30) return "Getting into it";
    if (percent <= 40) return "Now we're cooking";
    if (percent <= 50) return "Halfway hero!";
    if (percent <= 60) return "Now we're flying";
    if (percent <= 70) return "Unstoppable force";
    if (percent <= 80) return "Reach for those stars";
    if (percent <= 90) return "Go Forrest, go!";
    if (percent < 100) return "So close now!";
    return "Parkrun legend!";
  };

  const motivationalPhrase = getMotivationalPhrase(percentage);

  return (
    <div className="bg-gray-100 px-4 py-2 border-b" style={{ height: "5vh" }}>
      <div className="flex items-center justify-between h-full">
        <div className="text-sm font-medium">
          <span style={{ color: "var(--color-accent)" }}>
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {completed.length}
            </span>{" "}
            down{" "}
            <span
              className="font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {total}
            </span>{" "}
            to go!
          </span>
        </div>

        <div
          className="text-sm font-bold"
          style={{ color: "var(--color-primary)" }}
        >
          {percentage}%
        </div>

        <div className="relative w-32 bg-gray-300 rounded-full h-5">
          <div
            className="h-5 rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: "var(--color-parkrun)",
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-700 drop-shadow-sm">
              {motivationalPhrase}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
