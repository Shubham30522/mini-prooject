import React from "react";
import { NavLink } from "react-router-dom";
import microscope from "../assets/microscope.png";
import { useSelector } from "react-redux";
import { setToken } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
// import profileSlice from "../slices/profileSlice";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  // console.log(token);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    console.log("after redux step: ", user);
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    dispatch(setToken(null));
  };
  return (
    <div className="j">
      <div className="bg-red-700 flex flex-row justify-center flex-wrap min-h-12">
        <div className="w-[1200px] flex justify-between mt-2 text-white flex-wrap">
          <div className="flex gap-2">
            <img className="h-8 w-8" src={microscope} alt="" />

            <div className="text-xl">Blood Donation</div>
          </div>

          {/* <div className='flex gap-10 flex-wrap'> */}
          <div className="flex gap-4 mt-1">
            <div className="hover:text-green-400">
              {" "}
              <NavLink
                className="nav-link"
                id="Home"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </div>

            {token !== null && user !== null && user.accountType === "hospital" && (
              <div className="hover:text-green-400">
                <NavLink className="nav-link" id="About" to="/Add">
                  Add Request
                </NavLink>
              </div>
            )}

            <div className="hover:text-green-400">
              <NavLink className="nav-link" id="About" to="/About">
                About Us
              </NavLink>
            </div>
          </div>
          <div className="flex gap-3 mt-1">
            {/* Login Button */}
            {token === null && (
              <div className="hover:test-">
                {
                  <NavLink
                    className="nav-link"
                    id="Login"
                    aria-current="page"
                    to="/Login"
                  >
                    <button className="w-[90px] border-2 border-gray-300 hover:bg-slate-400 rounded-lg  hover:text-slate-800 ">
                      Login
                    </button>
                  </NavLink>
                }
              </div>
            )}

            {/* SignUp Button */}
            {token === null && (
              <div className="">
                {
                  <NavLink
                    className="nav-link"
                    id="SignUp"
                    aria-current="page"
                    to="/SignUp"
                  >
                    <button className="w-[90px] border-2 border-gray-300 hover:bg-slate-400 rounded-lg hover:text-slate-800 ">
                      Sign Up
                    </button>
                  </NavLink>
                }
              </div>
            )}

            {token !== null && (
              <div className="">
                {
                  <NavLink
                    className="nav-link"
                    id="logout"
                    aria-current="page"
                    to="/"
                  >
                    <button
                      onClick={logoutHandler}
                      className="w-[90px] border-2 border-gray-300 hover:bg-slate-400 rounded-lg hover:text-slate-800 "
                    >
                      Logout
                    </button>
                  </NavLink>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
