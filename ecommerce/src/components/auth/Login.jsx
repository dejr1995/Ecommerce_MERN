import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/AuthSlice";
import { StyledForm } from "./StyledForm";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>{t("login")}</h2>
        <input
          type="email"
          placeholder={t("email")}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder={t("oldpassword")}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {auth.loginStatus === "pending" ? t("submitting") : t("login")}
        </button>

        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
      </StyledForm>
    </>
  );
};

export default Login;
