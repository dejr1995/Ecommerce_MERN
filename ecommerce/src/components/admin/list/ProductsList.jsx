import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsAllFetch, productsDelete } from "../../../store/ProductSlice";
import EditProduct from "../EditProduct";
import { useTranslation } from "react-i18next";

export default function ProductsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [filter, setFilter] = useState("");

  const [placeholder, setPlaceholder] = useState("Ingresa el producto");

  useEffect(() => {
    dispatch(productsAllFetch());
  }, [dispatch]);

  useEffect(() => {
    const placeholders = [
      "Ingresa un producto",
      "Ingresa un producto .",
      "Ingresa un producto ..",
      "Ingresa un producto ...",
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
    items &&
    items
      .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
      .map((item) => {
        return {
          id: item._id,
          imageUrl: item.image.url,
          pName: item.name,
          pDesc: item.desc,
          price: item.price.toLocaleString(),
        };
      });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: t("imageuser"),
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: t("nameuser"), width: 130 },
    { field: "pDesc", headerName: t("descriptionuser"), width: 130 },
    { field: "price", headerName: t("priceuser"), width: 80 },
    {
      field: "actions",
      headerName: t("actionsuser"),
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>
              {t("delete")}
            </Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/product/${params.row.id}`)}>
              {t("view")}
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(productsDelete(id));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
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
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

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
