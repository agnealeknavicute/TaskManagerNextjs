import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className="bg-black/90 items-center h-11 text-white flex justify-between px-4">
      <div>Welcome!</div>
      <div className="flex justify-center">
        <Link
          href="/task-managment/task-list"
          className="px-4 hover:cursor-pointer"
        >
          Task List
        </Link>
        <Link
          href="/task-managment/task-adding"
          className="px-4 hover:cursor-pointer"
        >
          New Task
        </Link>
      </div>
    </header>
  );
};
