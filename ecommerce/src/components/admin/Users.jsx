import React from 'react'
import UsersList from './list/UsersList'
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();

  return (
    <>{t("users")}<UsersList/></>
  )
}

export default Users