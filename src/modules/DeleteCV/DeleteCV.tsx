import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { Bounce, toast } from 'react-toastify';
import type { Cv } from 'cv-graphql';
import { useLazyDeleteCv } from '../../graphql/mutations/deleteCV';
import { Container, Form, FormBody, FormHeader } from './DeleteCV';

interface DeleteCVProps {
  cv: Cv;
  onClick: () => void;
}

const DeleteCV: React.FC<DeleteCVProps> = ({ onClick, cv }) => {
  const [t] = useTranslation(['common', 'CVs']);

  const userData = sessionStorage.getItem('user');
  const user = JSON.parse(userData || '');

  const [deleteCv] = useLazyDeleteCv();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cv.user?.id === user.id || user.role === 'Admin') {
      try {
        const response = await deleteCv({
          variables: {
            cv: {
              cvId: cv.id || '',
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
    } else {
      return toast.error(t('common:youDontHavePermission'), {
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
          <Typography variant="h4"> {t('CVs:deleteCV')}</Typography>
          <ClearIcon
            onClick={onClick}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormBody>
            <Typography>{`${t('CVs:AreYouShure')} ${cv.name}`}</Typography>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: theme.spacing(5),
              }}
            >
              <Button variant="outlined" onClick={onClick}>
                {t('common:cancel')}
              </Button>
              <Button type={'submit'} variant="contained">
                {t('common:confirm')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default DeleteCV;
