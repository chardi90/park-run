import React from "react";

export default function ProgressBar({ completed, total }) {
  const percentage =
    total > 0 ? Math.round((completed.length / total) * 100) : 0;

  return (
    <div className="bg-gray-100 px-4 py-2 border-b" style={{ height: "5vh" }}>
      <div className="flex items-center justify-between h-full">
        <span className="text-sm font-medium">
          Progress: {completed.length}/{total}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-300 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-bold text-green-600">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
