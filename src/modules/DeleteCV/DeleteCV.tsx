import React from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import { useLazyDeleteCv } from '../../graphql/mutations/deleteCV';
import {
  ButtonStack,
  CloseIcon,
  Container,
  Form,
  FormBody,
  FormHeader,
} from './style';
import type { DeleteCVProps } from './type';

const DeleteCV: React.FC<DeleteCVProps> = ({ onClick, cv, onSuccess }) => {
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

        onSuccess();

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
          <CloseIcon onClick={onClick} />
        </FormHeader>

        <form onSubmit={handleSubmit}>
          <FormBody>
            <Typography>{`${t('CVs:AreYouShure')} ${cv.name}`}</Typography>
            <ButtonStack>
              <Button variant="outlined" onClick={onClick}>
                {t('common:cancel')}
              </Button>
              <Button type={'submit'} variant="contained">
                {t('common:confirm')}
              </Button>
            </ButtonStack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default DeleteCV;
