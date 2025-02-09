import React, { useState, useEffect } from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md px-10">
      <div className="flex-1">
        <a className="text-2xl font-bold text-[#158e8c]">TestLine Quiz</a>
      </div>

      <div className="flex-none flex items-center gap-6">
        <ul className="flex gap-4 text-lg">
          <li><a href="#" className="hover:text-[#158e8c] transition">Home</a></li>
          <li><a href="#" className="hover:text-[#158e8c] transition">About</a></li>
        </ul>

      </div>
    </div>
  );
};

export default Navbar;