import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { setHeaders, url } from "../../../store/api";
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

const Chart = () => {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  function compare(a, b) {
    if (a._id > b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return;
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/orders/week-sales`, setHeaders());

        //console.log("Datos de la API:", res.data);
        res.data.sort(compare);

        const newData = res.data.map((item) => {
          const DAYS = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

          return {
            day: DAYS[item._id - 1],
            amount: item.total / 100,
          };
        });
        //console.log("Nuevos datos:", newData);
        setSales(newData);
        setLoading(false);
      } catch (err) {
        alert("Error: " + err);
        //console.log(err);
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
          <h3>{t("earning7days")}(S/.)</h3>
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
              <XAxis dataKey="day" />
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

export default Chart;

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
