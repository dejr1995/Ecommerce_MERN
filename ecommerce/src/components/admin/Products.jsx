import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton, SecondaryButton } from "./CommonStyled";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isCreating = location.pathname === "/admin/products/create-product";

  const handleCreateClick = () => {
    navigate("/admin/products/create-product");
  };

  const handleCancelClick = () => {
    navigate("/admin/products");
  };
  return (
    <>
      <AdminHeaders>
        {t("products")}
        {!isCreating ? (
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

export default Products;
