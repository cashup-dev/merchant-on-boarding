import React from "react";

export default function NoData({ message = "No data found." }) {
  return (
    <div className="text-center text-gray-500 py-8 border rounded-xl shadow-sm">
      {message}
    </div>
  );
}
