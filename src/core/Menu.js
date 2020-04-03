import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#FF9900" };
  else return { color: "#FFFFFF" };
};

const profile = (history, userId) => {
  history.push(`/user/${userId}`);
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={() => signout(() => history.push("/"))}
                style={
                  (isActive(history, "/signup"),
                  { cursor: "pointer", color: "#FFF" })
                }
              >
                Sign Out
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => profile(history, isAuthenticated().user._id)}
            >
              <a className="nav-link">{`${
                isAuthenticated().user.name
              }'s Profile`}</a>
            </li>
          </>
        )}
        {/* {JSON.stringify(history)} */}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
