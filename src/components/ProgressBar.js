import React from "react";

export default function ProgressBar({ completed, total }) {
  const percentage =
    total > 0 ? Math.round((completed.length / total) * 100) : 0;

  const getMotivationalPhrase = (percent) => {
    if (percent === 0) return "ready to start?";
    if (percent <= 10) return "good start!";
    if (percent <= 20) return "building momentum";
    if (percent <= 30) return "getting into it";
    if (percent <= 40) return "now we're cooking";
    if (percent <= 50) return "halfway hero!";
    if (percent <= 60) return "now we're flying";
    if (percent <= 70) return "unstoppable force";
    if (percent <= 80) return "reach for those stars";
    if (percent <= 90) return "go Forrest, go!";
    if (percent < 100) return "so close now!";
    return "parkrun legend!";
  };

  const motivationalPhrase = getMotivationalPhrase(percentage);

  return (
    <div className="bg-gray-100 px-4 py-2 border-b" style={{ height: "5vh" }}>
      <div className="flex items-center justify-between h-full">
        <span className="text-sm font-medium">
          Progress:{" "}
          <span className="font-bold" style={{ color: "var(--color-accent)" }}>
            {completed.length}/{total}
          </span>
        </span>

        <div className="flex items-center gap-2">
          <div className="relative w-32 bg-gray-300 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-300"
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
          <span
            className="text-sm font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
