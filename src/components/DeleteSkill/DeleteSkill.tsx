import { Box, Button, Paper, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import type { Skill } from 'cv-graphql';
import { Bounce, toast } from 'react-toastify';
import theme from '../../theme/theme';
import { useLazyDeleteSkill } from '../../graphql/mutations/deleteSkill';

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
  left: 0,
  top: 0,
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

interface DeleteSkillProps {
  onClick: () => void;
  skill: Skill;
}
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
            <Typography>{`${t('common:sure')} ${skill.name} ${t('skills')}?`}</Typography>

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

export default DeleteSkill;
