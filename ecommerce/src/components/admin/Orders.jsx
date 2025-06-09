import React from 'react'
import OrdersList from './list/OrdersList'
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { t } = useTranslation();
  return (
    <>
    {t("orders")}<OrdersList/></>
  )
}

export default Orders;