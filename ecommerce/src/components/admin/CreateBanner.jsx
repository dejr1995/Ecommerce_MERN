import React, { useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useDispatch } from "react-redux";
import { bannersCreate } from "../../store/BannerSlice";
import { useTranslation } from "react-i18next";

const CreateBanner = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [bannerImg, setBannerImg] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBannerImg(reader.result);
      };
    } else {
      setBannerImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      bannersCreate({
        image: bannerImg,
      })
    );
  };
  return (
    <StyledCreateBanner>
      <StyledForm onSubmit={handleSubmit}>
        
        <h3>{t("createabanner")}</h3>
        <ImagePreview>
          {bannerImg ? (
            <>
              <img src={bannerImg} alt="Banner image!" />
            </>
          ) : (
            <p>{t("imagepreview")}</p>
          )}
        </ImagePreview>
        <input
          type="file"
          accept="image/*"
          onChange={handleProductImageUpload}
          required
        />
        <PrimaryButton type="submit">{t("submit")}</PrimaryButton>
      </StyledForm>
    </StyledCreateBanner>
  );
};

export default CreateBanner;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
  max-height: 350px;
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

const StyledCreateBanner = styled.div`
  display: flex;
  justify-content: center;
`;

const ImagePreview = styled.div`
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;
