import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import { useLazyDeleteLanguage } from '../../graphql/mutations/deleteLanguage';
import type { Language } from 'cv-graphql';
import { Bounce, toast } from 'react-toastify';
import theme from '../../theme/theme';
import { Container, Form, FormBody, FormHeader } from './DeleteLanguage';

interface DeleteLanguageProps {
  onClick: () => void;
  language: Language;
}

const DeleteLanguage: React.FC<DeleteLanguageProps> = ({
  onClick,
  language,
}) => {
  const [t] = useTranslation(['common', 'languages']);

  const user = JSON.parse(sessionStorage.getItem('user') || '');

  const [deleteLanguage, { loading }] = useLazyDeleteLanguage();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.role !== 'Admin') {
      toast.error(t('common:youDontHavePermission'), {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await deleteLanguage({
        variables: {
          language: {
            languageId: language.id || '',
          },
        },
      });

      if (!response.data) return;

      toast.success(`${t('common:successfully')}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });

      onClick();
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  return (
    <Container>
      <Form>
        <FormHeader>
          <Typography variant="h5">{t('languages:removeSkills')} </Typography>
          <ClearIcon
            onClick={onClick}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </FormHeader>

        <form onSubmit={onSubmit}>
          <FormBody>
            <Typography>{`${t('common:sure')} ${language.name} ${t('language')}?`}</Typography>

            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: theme.spacing(5),
              }}
            >
              <Button variant="outlined" onClick={onClick}>
                {t('cancel')}
              </Button>
              <Button variant="contained" type="submit" loading={loading}>
                {t('common:confirm')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default DeleteLanguage;
