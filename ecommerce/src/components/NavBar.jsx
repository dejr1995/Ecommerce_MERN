import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../store/AuthSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Parameters from "./Parameters";

const NavBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Microtech</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <span>
            <h3 style={{ paddingTop: "10px" }}>{t("cart")}</h3>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
      <Parameters />
      {auth._id ? (
        <Links>
          {auth.isAdmin ? (
            <div>
              <Link to="/admin/summary">Admin</Link>
            </div>
          ) : (
            <Link to="/client/ordersclient">Tu cuenta</Link>
          )}
          <div
            onClick={() => {
              dispatch(logoutUser(null));
              toast.warning("Logged out!", { position: "bottom-left" });
            }}
          >
            {t("logout")}
          </div>
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login">{t("login")}</Link>
          <Link to="/register">{t("register")}</Link>
        </AuthLinks>
      )}
    </nav>
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
