import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { setHeaders, url } from "../../../store/api";
import moment from 'moment';
import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [isLOading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <StyledTransaction>
      {isLOading ? (
        <p>{t("transactionsloading")}</p>
      ) : (
        <>
          <h3>{t("latesttransaction")}</h3>
          {orders?.map((order, index) => (
            <Transaction key={index}>
              <p>{order.shipping.name}</p>
              <p>{(order.total / 100).toLocaleString()}</p>
              <p>{moment(order.createdAt).fromNow()}</p>
            </Transaction>
          ))}
        </>
      )}
    </StyledTransaction>
  );
};

export default Transactions;

const StyledTransaction = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;

const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  p {
    flex: 1;
  }
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;
