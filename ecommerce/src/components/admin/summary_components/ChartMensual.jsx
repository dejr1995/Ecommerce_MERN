import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { setHeaders, url } from '../../../store/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const ChartMensual = () => {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/orders/month-sales`, setHeaders());

        // Ordenar los datos por el campo _id (mes)
        const sortedData = res.data.sort((a, b) => a._id - b._id);

        const newData = sortedData.map((item) => {
          const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
          return {
            month: MONTHS[item._id - 1],
            amount: item.total / 100,  // Ajusta la división según sea necesario
          };
        });

        setSales(newData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader>{t("loadingchart")}</Loader>
      ) : (
        <StyledChart>
          <h3>{t("earning30days")}(S/.)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </StyledChart>
      )}
    </>
  );
};

export default ChartMensual;

const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  padding: 1rem;
  border: 2px solid rgba(48, 51, 78, 0.2);
  border-radius: 5px;

  h3 {
    margin-bottom: 1rem;
  }
`;

const Loader = styled.p`
  margin-top: 2rem;
`;
