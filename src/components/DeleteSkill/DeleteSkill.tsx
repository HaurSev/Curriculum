import { Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import { useLazyDeleteSkill } from '../../graphql/mutations/deleteSkill';
import { type DeleteSkillProps } from './type';
import {
  ButtonStack,
  CloseIcon,
  Container,
  Form,
  FormBody,
  FormHeader,
} from './style';

const DeleteSkill: React.FC<DeleteSkillProps> = ({ onClick, skill }) => {
  const [t] = useTranslation(['common', 'skills']);

  const user = JSON.parse(sessionStorage.getItem('user') || '');

  const [deleteSkill, { loading }] = useLazyDeleteSkill();

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
      const response = await deleteSkill({
        variables: {
          skill: {
            skillId: skill.id || '',
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
          <Typography variant="h5">{t('skills:removeSkills')} </Typography>
          <CloseIcon onClick={onClick} />
        </FormHeader>

        <form onSubmit={onSubmit}>
          <FormBody>
            <Typography>{`${t('common:sure')} ${skill.name} ${t('skills')}?`}</Typography>

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

export default DeleteSkill;
