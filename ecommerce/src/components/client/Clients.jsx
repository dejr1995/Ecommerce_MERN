import React, { useEffect, useState } from "react";
import { setHeaders, url } from "../../store/api";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Clients = () => {
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!auth._id) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `${url}/users/find/${auth._id}`,
          setHeaders()
        );

        setUser({
          ...res.data,
          password: "", // No es necesario mostrar la contraseña en el formulario
        });
        setError(null);
      } catch (err) {
        setError(err.message || "Error fetching user data");
      }
      setLoading(false);
    };

    fetchUser();
  }, [auth._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put(
        `${url}/users/${auth._id}`,
        user,
        setHeaders()
      );

      setUser({ ...res.data, password: "" });
      toast.success("Profile updated...");
      setError(null);
    } catch (err) {
      setError(err.message || "Error updating user profile");
    }
    setUpdating(false);
  };

  return (
    <StyledProfile>
      <ProfileContainer>
        {loading ? (
          <p>{t("loading")}</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>{t("userprofile")}</h3>
            {user.isAdmin ? (
              <Admin>{t("admin")}</Admin>
            ) : (
              <Customer>{t("customer")}</Customer>
            )}
            <label htmlFor="name">{t("name")}:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor="email">{t("email")}:</label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">{t("password")}:</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit" disabled={updating}>
              {updating ? t("updating") : t("updateProfile")}
            </button>
          </form>
        )}
      </ProfileContainer>
    </StyledProfile>
  );
};

export default Clients;

const StyledProfile = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 400px;

    h3 {
      margin-bottom: 1rem;
    }
    label {
      margin-bottom: 0.5rem;
      color: gray;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: 1px solid gray;
      border-radius: 5px;
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
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

const UserId = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
  color: #333;
`;
