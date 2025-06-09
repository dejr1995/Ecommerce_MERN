import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import {
  FaUsers,
  FaStore,
  FaClipboard,
  FaTachometerAlt,
  FaUserCog,
  FaShoppingCart,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) return <p>{t("accessdenied")}.</p>;

  return (
    <StyledDashboard>
      <SideNav>
        <h3>{t("quicklinks")}</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        >
          <FaTachometerAlt style={{ marginRight: "10px" }} /> {t("summary")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products"
        >
          <FaStore style={{ marginRight: "10px" }} />
          {t("products")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          <FaClipboard style={{ marginRight: "10px" }} />
          {t("orders")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/banners"
        >
          <MdLocalOffer style={{ marginRight: "10px" }} />
          {t("banners")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          <FaUsers style={{ marginRight: "10px" }} />
          {t("users")}
        </NavLink>
        <NavLink
          style={{ marginTop: "10px" }}
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/ordersclient"
        >
          <FaShoppingCart style={{ marginRight: "10px" }} />
          {t("orders2")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/myuser"
        >
          <FaUserCog style={{ marginRight: "10px" }} />
          {t("account")}
        </NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;

    svg {
      margin-right: 0%.5rem;
      font-size: 18px;
    }
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;
