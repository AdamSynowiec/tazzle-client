import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-svh">
      <div className="h-16">
        <div className="flex items-center justify-between h-full px-6 border-b">
          <div className="grid grid-cols-[250px_1fr]">
            <div className="flex items-center gap-1 hover:text-blue-600">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M11 6.5h2M11 18h2m-7-5v-2m12 2v-2M5 8h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0 12h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm12 0h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Zm0-12h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z"
                />
              </svg>

              <h1 className="font-poppins text-xl font-normal">
                <Link to={"/"}>Tazzle</Link>
              </h1>
            </div>
            <nav className="h-full">
              <ul className="h-full flex items-center justify-center gap-2 font-poppins text-sm font-normal ">
                <li>
                  <Link to={'board'} className="hover:bg-slate-100 p-2 rounded-md cursor-pointer">
                    Twoja praca
                  </Link>
                </li>
                <li>
                  <Link
                    to={"projects"}
                    className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
                  >
                    Projekty
                  </Link>
                </li>
                <li>
                  <Link
                    to={"create"}
                    className="hover:bg-blue-600 p-2 rounded-md cursor-pointer bg-blue-500 p-2 rounded text-white font-medium"
                  >
                    Utwórz
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="">
            <div className=""></div>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-poppins text-sm font-light">
              AS
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[250px_1fr] h-[calc(100vh_-_64px)]">
        <div className="h-full p-6 border-r">
          <ul className="space-y-2 underline">
            <li><a href="">Twoja praca</a></li>
            <li><a href="">Projekty</a></li>
            <li><a href="">Utwórz</a></li>
          </ul>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
