import React from "react";

export function LoadingComponent({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center h-full ">
      <div className="px-3 py-2 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        {text}
      </div>
    </div>
  );
}
