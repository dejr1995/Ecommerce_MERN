import React from 'react'
import { useSelector } from "react-redux";
import axios from 'axios';
import { url } from '../store/api'
import { useTranslation } from 'react-i18next';
const PayButton = ({cartItems}) => {

  const { t } = useTranslation();
  const user = useSelector((state) => state.auth);

    const handleCheckout = () => {
      axios.post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if(res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
    }
  return (
    <>
    <button onClick={() => handleCheckout()}>{t("checkout")}</button>
    </>
  )
}

export default PayButton