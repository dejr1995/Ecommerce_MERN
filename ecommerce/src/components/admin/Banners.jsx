import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton, SecondaryButton } from "./CommonStyled";
import { useTranslation } from "react-i18next";

const Banners = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showCreateBanner, setShowCreateBanner] = useState(true);

  const handleCreateClick = () => {
    setShowCreateBanner(false);
    navigate("/admin/banners/create-banner");
  };

  const handleCancelClick = () => {
    setShowCreateBanner(true);
    navigate("/admin/banners");
  };
  return (
    <>
      <AdminHeaders>
        {t("banners")}
        {showCreateBanner ? (
          <PrimaryButton onClick={handleCreateClick}>
            {t("create")}
          </PrimaryButton>
        ) : (
          <SecondaryButton onClick={handleCancelClick}>
            {t("back")}
          </SecondaryButton>
        )}
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Banners;
