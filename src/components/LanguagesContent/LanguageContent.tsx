import { Box, styled, Typography } from '@mui/material';
import type { LanguageProficiency } from 'cv-graphql';
import React, { lazy, Suspense, useState } from 'react';
import theme from '../../theme/theme';
import { useParams } from 'react-router-dom';

const UpdateLanguage = lazy(
  () => import('../../modules/UpdateLanguage/UpdateLanguage'),
);

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '80%',
  justifyContent: 'flex-start',
  padding: theme.spacing(5),
  gap: '25%',
}));

const Block = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
  cursor: 'pointer',
}));

interface LanguageContentProps {
  languages: LanguageProficiency[];
}

const LanguageContent: React.FC<LanguageContentProps> = ({ languages }) => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const [isUpdateOpen, setUpdateOpen] = useState(false);

  const handleOpen = () => {
    setUpdateOpen(true);
  };
  const handleClose = () => {
    setUpdateOpen(false);
  };

  return (
    <Container>
      {languages.map((lang) => (
        <Block onClick={handleOpen}>
          <Typography variant="h6">{lang.proficiency}</Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.disabled,
            }}
          >
            {lang.name}
          </Typography>
          {(userId === userData.id || userData.role === 'Admin') &&
            isUpdateOpen && (
              <Suspense>
                <UpdateLanguage
                  onClick={handleClose}
                  userLanguage={lang}
                ></UpdateLanguage>
              </Suspense>
            )}
        </Block>
      ))}
    </Container>
  );
};

export default LanguageContent;
