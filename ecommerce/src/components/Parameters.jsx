import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import iconespana from "../assets/images/espana.png";
import iconeeuu from "../assets/images/eeuu.png";

const Lenguaje = () => {

  const [selectedButton, setSelectedButton] = useState("es");

  const { i18n } = useTranslation();

  const changeLanguage1 = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedButton(lng === "en" ? "" : "en");
  };
  const changeLanguage2 = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedButton(lng);
    setSelectedButton(lng === "es" ? "" : "es");
  };

  return (
    <div>
      <div className="absolute lg:top-[3%] z-10 lg:left-[2%] right-[12%] top-[1.9%]">
        <div className="flex gap-2">
          <img
            onClick={() => changeLanguage2(i18n.language === "en" ? "" : "en")}
            src={iconeeuu}
            alt="English"
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />

          <span className="text-gray-600/70"> </span>
          <img
            onClick={() => changeLanguage1(i18n.language === "es" ? "" : "es")}
            src={iconespana}
            alt="English"
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Lenguaje;
