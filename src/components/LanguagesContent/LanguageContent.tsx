import { Box, styled, Typography } from '@mui/material';
import type { LanguageProficiency } from 'cv-graphql';
import React, { lazy, Suspense, useState } from 'react';
import theme from '../../theme/theme';
import { useParams } from 'react-router-dom';
import checkedLanguagesStore from '../../store/ckeckeLanguagesStore';

const UpdateLanguage = lazy(
  () => import('../../modules/UpdateProfileLanguage/UpdateProfileLanguage'),
);

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '90%',
  justifyContent: 'flex-start',
  padding: theme.spacing(5),
  gap: '25%',
  flexWrap: 'wrap',
}));

const Block = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
  cursor: 'pointer',
  marginBottom: theme.spacing(5),
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
}));

const CheckedBlock = styled(Block)(() => ({
  background: 'rgba(107, 36, 36, 0.21)',
  borderRadius: theme.spacing(10),
  boxShadow: `5px 3px rgba(33, 29, 29, 0.32)`,
}));

interface LanguageContentProps {
  languages: LanguageProficiency[];
}

interface LanguageBodyProps {
  language: LanguageProficiency;
}

const LanguageBody: React.FC<LanguageBodyProps> = ({ language }) => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isChecked, setCheck] = useState(false);

  const handleOpen = () => {
    setUpdateOpen(true);
  };
  const handleClose = () => {
    setUpdateOpen(false);
  };

  const addItem = checkedLanguagesStore((state) => state.addItem);
  const removeItem = checkedLanguagesStore((state) => state.removeItem);

  const handleCheckItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userId === userData.id || userData.role === 'Admin') {
      if (isChecked) {
        removeItem(language.name);
      } else {
        addItem(language);
      }
      setCheck(!isChecked);
    }
  };

  return isChecked ? (
    <CheckedBlock onClick={handleOpen} onContextMenu={handleCheckItem}>
      <Typography variant="h6">{language.proficiency}</Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.disabled,
        }}
      >
        {language.name}
      </Typography>
      {(userId === userData.id || userData.role === 'Admin') &&
        isUpdateOpen && (
          <Suspense>
            <UpdateLanguage
              onClick={handleClose}
              userLanguage={language}
            ></UpdateLanguage>
          </Suspense>
        )}
    </CheckedBlock>
  ) : (
    <Block onClick={handleOpen} onContextMenu={handleCheckItem}>
      <Typography variant="h6">{language.proficiency}</Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.disabled,
        }}
      >
        {language.name}
      </Typography>
      {(userId === userData.id || userData.role === 'Admin') &&
        isUpdateOpen && (
          <Suspense>
            <UpdateLanguage
              onClick={handleClose}
              userLanguage={language}
            ></UpdateLanguage>
          </Suspense>
        )}
    </Block>
  );
};

const SkillContent: React.FC<LanguageContentProps> = ({ languages }) => {
  return (
    <Container>
      {languages.map((lang) => {
        return <LanguageBody key={lang.name} language={lang} />;
      })}
    </Container>
  );
};

export default SkillContent;
