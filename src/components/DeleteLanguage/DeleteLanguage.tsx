import { Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyDeleteLanguage } from '../../graphql/mutations/deleteLanguage';
import { Bounce, toast } from 'react-toastify';
import {
  ButtonStack,
  ClearIconHover,
  Container,
  Form,
  FormBody,
  FormHeader,
} from './style';
import { type DeleteLanguageProps } from './type';

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
          <ClearIconHover></ClearIconHover>
        </FormHeader>

        <form onSubmit={onSubmit}>
          <FormBody>
            <Typography>{`${t('common:sure')} ${language.name} ${t('language')}?`}</Typography>

            <ButtonStack>
              <Button variant="outlined" onClick={onClick}>
                {t('cancel')}
              </Button>
              <Button variant="contained" type="submit" loading={loading}>
                {t('common:confirm')}
              </Button>
            </ButtonStack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default DeleteLanguage;
