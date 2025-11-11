import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import type { UserInfoProps } from './type';
import { InfoContainer, UserName, UserEmail, MemberSince } from './style';

const UserInfo: React.FC<UserInfoProps> = ({
  full_name,
  email,
  created_at,
}) => {
  const [t] = useTranslation(['common', 'users']);

  return (
    <InfoContainer>
      <UserName>{full_name || t('username')}</UserName>
      <UserEmail>{email || t('email')}</UserEmail>
      <MemberSince>
        {t('users:aMemberSince') || t('notFound')}
        {moment(parseInt(created_at || '')).format(' ddd MMMM D YYYY')}
      </MemberSince>
    </InfoContainer>
  );
};

export default UserInfo;
