import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { FaUserCog, FaShoppingCart } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DashboardClients = () => {
  const { t } = useTranslation();

  return (
    <StyledDashboard>
      <SideNav>
        <h3>{t("quicklinks")}</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/client/ordersclient"
        >
          <FaShoppingCart />
          {t("orders2")}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/client/clients"
        >
          <FaUserCog />
          {t("account")}
        </NavLink>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default DashboardClients;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: absolute;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

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
