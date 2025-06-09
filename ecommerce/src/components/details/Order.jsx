import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { setHeaders, url } from "../../store/api";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation();

  const params = useParams();

  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${url}/orders/findOne/${params.id}`,
          setHeaders()
        );

        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [params.id]);

  return (
    <StyledOrder>
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <>
          <OrdersContainer>
            <h2>{t("orderdetails")}</h2>
            <p>
            {t("deliverystatus")}:{" "}
              {order.delivery_status === "pending" ? (
                <Pending>{t("pending")}</Pending>
              ) : order.delivery_status === "dispatched" ? (
                <Dispatched>{t("dispatched")}</Dispatched>
              ) : order.delivery_status === "delivered" ? (
                <Delivered>{t("delivered")}</Delivered>
              ) : (
                "error"
              )}
            </p>

            <h3>{t("orderproducts")}</h3>
            <Items>
              {order.products?.map((product, index) => (
                <Item key={index}>
                  <span>{product.description}</span>
                  <span>{product.quantity}</span>
                  <span>
                    {"S/. " + (product.amount_total / 100).toLocaleString()}
                  </span>
                </Item>
              ))}
            </Items>
            <div>
              <h3>{t("totalprice")}</h3>
              <p>{"S/. " + (order.total / 100).toLocaleString()}</p>
            </div>
            <div>
              <h3>{t("shippingdetails")}</h3>
              <p>{t("customer")}: {order.shipping?.name}</p>
              <p>{t("city")}: {order.shipping?.address.city}</p>
              <p>{t("email")}: {order.shipping?.email}</p>
            </div>
          </OrdersContainer>
        </>
      )}
    </StyledOrder>
  );
};

export default Order;

const StyledOrder = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const OrdersContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.span`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
