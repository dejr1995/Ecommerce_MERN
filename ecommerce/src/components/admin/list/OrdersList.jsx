import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ordersAllFetch, ordersEdit } from "../../../store/OrdersSlice";
import moment from "moment";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function OrdersList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listorders } = useSelector((state) => state.orders);

  const [filter, setFilter] = useState("");

  const [placeholder, setPlaceholder] = useState("Ingresa un nombre");

  useEffect(() => {
    dispatch(ordersAllFetch());
  }, [dispatch]);

  useEffect(() => {
    const placeholders = [
      "Ingresa un nombre",
      "Ingresa un nombre .",
      "Ingresa un nombre ..",
      "Ingresa un nombre ...",
    ];
    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRows =
    listorders &&
    listorders
      .filter((order) =>
        order.shipping.name.toLowerCase().includes(filter.toLowerCase())
      )
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
    { field: "id", headerName: "ID", width: 220 },
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
    {
      field: "actions",
      headerName: t("actionsuser"),
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Actions>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
              {t("dispatch")}
            </DispatchBtn>
            <DeliveryBtn onClick={() => handleOrderDeliver(params.row.id)}>
              {t("deliver")}
            </DeliveryBtn>
            <View onClick={() => navigate(`/order/${params.row.id}`)}>
              {t("view")}
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };

  const handleOrderDeliver = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "delivered",
      })
    );
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "orders.xlsx"
    );
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <OrdersListContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "10px",
          }}
        >
          <input
            placeholder={placeholder}
            style={{
              width: "300px",
              borderRadius: "5px",
              padding: "8px",
              border: "1px solid #ccc",
              outline: "none",
              marginBottom: "10px",
            }}
            value={filter}
            onChange={handleFilterChange}
          ></input>
          <RiFileExcel2Fill
            cursor={"pointer"}
            color="#008A00"
            size={30}
            style={{ marginLeft: "5px" }}
            onClick={exportToExcel}
          />
        </div>
        <DataGrid
          rows={filteredRows}
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

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 49);
`;

const DeliveryBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

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
