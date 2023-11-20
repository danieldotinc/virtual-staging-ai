import React from 'react';
import Link from 'next/link';

const Navbar = () => (
  <div className="flex justify-center fixed w-full bg-white z-100">
    <nav className=" w-9/12 z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl whitespace-nowrap  font-thin tracking-widest text-black">
            VIRTUAL STAGING AI
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:text-black md:p-0 font-light"
                  aria-current="page"
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:p-0 font-light"
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:p-0 font-light"
                >
                  GALLERY
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-black md:p-0 font-light"
                >
                  PRICES
                </a>
              </li>
            </ul>
            <Link
              href="/dashboard"
              className="ml-6 border border-blue-300 text-cyan-600 hover:text-gray-800 hover:bg-gray-200 hover:border-gray-200 font-light rounded-lg text-sm px-4 py-2 text-center "
            >
              dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Navbar;
