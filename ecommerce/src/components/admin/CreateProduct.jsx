import React, { useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useDispatch } from "react-redux";
import { productsCreate } from "../../store/ProductSlice";
import { useTranslation } from "react-i18next";

const CreateProduct = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      productsCreate({
        name,
        brand,
        price,
        desc,
        image: productImg,
      })
    );
  };
  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>{t("createaproduct")}</h3>
        <input
          type="file"
          accept="image/"
          onChange={handleProductImageUpload}
          required
        />
        <select onChange={(e) => setBrand(e.target.value)} required>
          <option value="">{t("selectbrand")}</option>
          <option value="iphone">Iphone</option>
          <option value="samsung">Samsung</option>
          <option value="xiaomi">Xiaomi</option>
          <option value="other">{t("other")}</option>
        </select>
        <input
          type="text"
          required
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <PrimaryButton type="submit">{t("submit")}</PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <>
            <img src={productImg} alt="product image!" />
          </>
        ) : (
          <p>{t("imagepreview")}</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
