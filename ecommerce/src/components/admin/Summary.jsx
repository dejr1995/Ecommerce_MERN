import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary_components/Widget";
import axios from "axios";
import { setHeaders, url } from "../../store/api";
import Chart from "./summary_components/Chart";
import ChartMensual from "./summary_components/ChartMensual";
import Transactions from "./summary_components/Transactions";
import AllTimeData from "./summary_components/AllTimeData";
import { useTranslation } from "react-i18next";

const Summary = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [usersPerc, setUsersPerc] = useState(0);

  const [orders, setOrders] = useState([]);
  const [ordersPerc, setOrdersPerc] = useState(0);

  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());

        res.data.sort(compare);
        setUsers(res.data);
        if (res.data.length > 1) {
          setUsersPerc(
            ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          );
        } else {
          setUsersPerc(0);
        }
      } catch (err) {
        alert("Error: " + err);
        //console.log(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());

        res.data.sort(compare);
        setOrders(res.data);
        if (res.data.length > 1) {
          setOrdersPerc(
            ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          );
        } else {
          setOrdersPerc(0);
        }
      } catch (err) {
        alert("Error: " + err);
        //console.log(err);
      }
    }
    fetchData();
  }, []);

  //ganancia
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());

        res.data.sort(compare);
        setIncome(res.data);
        if (res.data.length > 1) {
          setIncomePerc(
            ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          );
        } else {
          setIncomePerc(0);
        }
      } catch (err) {
        alert("Error: " + err);
        //console.log(err);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: <p>{t("users")}</p>,
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPerc,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: <p>{t("orders")}</p>,
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: ordersPerc,
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total ? income[0]?.total / 100 : "",
      isMoney: true,
      title: <p>{t("earnings")}</p>,
      color: "rgb(254, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: incomePerc,
    },
  ];

  const [showChart, setShowChart] = useState(true);

  return (
    <StyledSumary id="flexSumary">
      <MainStats>
        <Overview id="flexOverview">
          <Title>
            <h2>{t("overview")}</h2>
            <p>{t("messagecompare")}.</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        {showChart ? <Chart /> : <ChartMensual />}
      </MainStats>
      <SideStats>
        <Transactions />
        <AllTimeData />
        <Button onClick={() => setShowChart(!showChart)}>
          {showChart ? t("monthly") : t("weekly")}
        </Button>
      </SideStats>
    </StyledSumary>
  );
};

export default Summary;

const StyledSumary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  display: 100%;
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-right: 2rem;
  width: 100%;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
