import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-20 w-20"></div>
    </div>
  );
}

export default Loading;
