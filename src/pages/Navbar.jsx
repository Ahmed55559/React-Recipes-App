import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import useWindowResize from "../assets/use-window-resize/useWindowResize";
import { GlobalContext } from "../context/context";
export default function Navbar() {
  const windowSize = useWindowResize();
  const isMobile = windowSize.width < 640;
  const [showSearch, setShowSearch] = useState(false);
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);
  function handleOpenSearch() {
    setShowSearch(!showSearch);
  }
  return (
    <div className="navbar backdrop-blur-md md:px-4 sm:px-2">
      <div className="navbar-start w-fit">
        <p className=" btn-ghost text-xl">Recipes app</p>
      </div>

      <div className="navbar-end grow">
        {isMobile ? (
          <div
            className={
              showSearch
                ? "dropdown dropdown-bottom"
                : "dropdown dropdown-left dropdown-bottom"
            }
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mx-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content  bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/favorite"}>Favorite</NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <ul
            tabIndex={0}
            className="menu menu-horizontal menu-sm md:menu-md lg:menu-lg flex justify-between z-1 w-fit"
          >
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/favorite"}>Favorite</NavLink>
            </li>
          </ul>
        )}
        <div className="divider  sm:divider-horizontal"></div>
        <div className=" w-fit flex  items-center search-box">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className={
                showSearch
                  ? "rounded h-8 transition-all duration-300 p-2 w-25 md:w-40 outline-none"
                  : "rounded h-8 transition-all duration-300 opacity-1 p-2 w-0"
              }
              placeholder="Search for a recipe..."
            />
          </form>
          <button
            className="btn btn-ghost btn-circle mx-2"
            onClick={() => handleOpenSearch()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
