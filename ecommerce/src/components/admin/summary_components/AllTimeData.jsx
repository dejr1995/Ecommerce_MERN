import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AllTimeData = () => {
  const { t } = useTranslation();
  const { items = [] } = useSelector((state) => state.products);
  const { list = [] } = useSelector((state) => state.users);
  const { listorders = [] } = useSelector((state) => state.orders);

  const calculateTotalEarnings = () => {
    const monthlyEarnings = {};

    listorders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth(); // Obtener el mes del pedido
      const earnings = order.total; // Obtener las ganancias del pedido

      // Agregar las ganancias al total del mes
      if (monthlyEarnings[month]) {
        monthlyEarnings[month] += earnings;
      } else {
        monthlyEarnings[month] = earnings;
      }
    });

    // Sumar las ganancias de todos los meses
    const totalEarnings = Object.values(monthlyEarnings).reduce(
      (acc, earnings) => acc + earnings,
      0
    );

    return Math.floor(totalEarnings / 100);
  };

  const totalEarnings = calculateTotalEarnings();

  return (
    <Main>
      <h3>{t("alltime")}</h3>
      <Info>
        <Title>{t("users")}</Title>
        <Data>{list.length}</Data>
      </Info>
      <Info>
        <Title>{t("products")}</Title>
        <Data>{items.length}</Data>
      </Info>
      <Info>
        <Title>{t("orders")}</Title>
        <Data>{listorders.length}</Data>
      </Info>
      <Info>
        <Title>{t("earnings")}</Title>
        <Data>{totalEarnings}</Data>
      </Info>
    </Main>
  );
};

export default AllTimeData;

const Main = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0%.3rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;

const Title = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
