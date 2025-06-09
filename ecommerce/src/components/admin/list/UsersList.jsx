import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersAllFetch, usersDelete } from "../../../store/UsersSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function UsersList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.users);

  const [filter, setFilter] = useState("");

  const [placeholder, setPlaceholder] = useState("Ingresa un nombre");

  useEffect(() => {
    dispatch(usersAllFetch());
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
    list &&
    list
      .filter((user) => user.name.toLowerCase().includes(filter.toLowerCase()))
      .map((user) => {
        return {
          id: user._id,
          uName: user.name,
          uEmail: user.email,
          isAdmin: user.isAdmin,
        };
      });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "uName", headerName: t("nameuser"), width: 150 },
    { field: "uEmail", headerName: t("emailuser"), width: 200 },
    {
      field: "isAdmin",
      headerName: t("roleuser"),
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>{t("admin")}</Admin>
            ) : (
              <Customer>{t("customer")}</Customer>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: t("actionsuser"),
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete
              onClick={() => handleDelete(params.row.id)}
              disabled={params.row.isAdmin}
            >
              {t("delete")}
            </Delete>
            <View onClick={() => navigate(`/user/${params.row.id}`)}>
              {t("view")}
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(usersDelete(id));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <UserListContainer>
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
      </UserListContainer>
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

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const UserListContainer = styled.div`
  margin-top: 30px;
`;
