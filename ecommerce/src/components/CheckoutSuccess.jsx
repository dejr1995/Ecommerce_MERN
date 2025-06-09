import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../store/CartSlice";
import styled from "styled-components";
import { t } from "i18next";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]);

  return (
    <Container>
      <h2>{t("checkoutsuccess")}</h2>
      <p>{t("statusorder")}</p>
      <p>{t("statusorder2")}</p>
      <p>{t("support")}</p>
      <strong>diegojara@devernlei.com</strong>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;
