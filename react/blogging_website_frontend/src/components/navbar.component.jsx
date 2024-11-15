import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../imgs/logo.jpeg";
import { UserContext } from "../App";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  // searchBoxVisibility :want to show search box or not
  // setSearchBoxVisibility : call if we want to change the functionality of the search box

  const [userNavPanel, setUserNavPanel] = useState(false);

  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  return (
    <>
      <nav className="navbar">
        {/* Link is used so that we do not have to refresh the page again and again */}
        <Link to="/" className="flex-none w-35 h-20">
          <img src={logo} className="w-full" />
        </Link>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          {access_token ? (
            <>
              <div
                className={
                  "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md-border-0 md:block md:relative md-inset-0 md:p-0 md:w-auto md:show " +
                  (searchBoxVisibility ? "show" : "hide")
                }
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full md:w-auto bg-grey p-4 pl-3 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                />

                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
              </div>

              <button
                className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
                onClick={() =>
                  setSearchBoxVisibility((curruntVal) => !curruntVal)
                }
              >
                <i className="fi fi-rr-search text-xl"></i>
              </button>

              <Link to="/editor" className="hidden md:flex gap-2 link">
                <i className="fi fi-rr-file-edit"></i>
                <p>Write</p>
              </Link>

              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                </button>
              </Link>

              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                {userNavPanel ? <UserNavigationPanel /> : ""}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>
              <Link className="btn-light py-2 hidden md:block" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
