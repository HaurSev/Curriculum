import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { Bounce, toast } from 'react-toastify';
import type { Cv } from 'cv-graphql';
import { useLazyDeleteCv } from '../../graphql/mutations/deleteCV';

const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100vh',
  zIndex: 100,
  background: 'rgba(0,0,0,0.8)',
  position: 'absolute',
  top: 0,
  left: 0,
}));

const Form = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 800,
  width: '80%',
  padding: theme.spacing(10),
  paddingTop: theme.spacing(4),
  opacity: 0.8,
}));

const FormHeader = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
}));

const FormBody = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  gap: theme.spacing(5),
  paddingTop: theme.spacing(2),
}));

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
