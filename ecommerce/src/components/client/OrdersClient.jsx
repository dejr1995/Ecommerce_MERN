import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setHeaders, url } from "../../store/api";
import { ordersAllFetch } from "../../store/OrdersSlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function OrdersList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { listorders } = useSelector((state) => state.orders);

  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      if (!auth._id) return;

      try {
        const res = await axios.get(
          `${url}/users/find/${auth._id}`,
          setHeaders()
        );
        setUser({ name: res.data.name });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [auth._id]);

  useEffect(() => {
    dispatch(ordersAllFetch());
  }, [dispatch]);

  const rows =
    listorders &&
    listorders
      .filter((order) => order.shipping.name === user.name)
      .map((order) => {
        return {
          id: order._id,
          cName: order.shipping.name,
          amount: (order.total / 100)?.toLocaleString(),
          dStatus: order.delivery_status,
          date: moment(order.createdAt).fromNow(),
        };
      });

  const columns = [
    { field: "cName", headerName: t("nameuser"), width: 120 },
    { field: "amount", headerName: t("amountuser"), width: 100 },
    {
      field: "dStatus",
      headerName: t("statususer"),
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.dStatus === "pending" ? (
              <Pending>{t("pending")}</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched>{t("dispatched")}</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>{t("delivered")}</Delivered>
            ) : (
              "error"
            )}
          </>
        );
      },
    },
    { field: "date", headerName: t("dateuser"), width: 120 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <OrdersListContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </OrdersListContainer>
    </div>
  );
}

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const OrdersListContainer = styled.div`
  margin-top: 30px;
`;
