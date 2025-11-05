import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { useLazyCreateSkill } from '../../graphql/mutations/createSkill';

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

interface CreateSkillProps {
  onClick: () => void;
}

interface CreateSkillForm {
  name: string;
  categoryId: string;
}

const CreateSkillSchema = z.object({
  name: z.string().nonempty(),
  categoryId: z.string().nonempty(),
});

const CreateSkill: React.FC<CreateSkillProps> = ({ onClick }) => {
  const [t] = useTranslation(['skills', 'common']);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const [skillCategory, { data: dataCategories }] = useLazySkillCategories();

  const loadSkillCategory = async () => {
    try {
      const response = await skillCategory({
        variables: {},
      });

      if (!response.data) return;
      if (!response.data.skillCategories) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    loadSkillCategory();
  }, [skillCategory]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSkillForm>({
    resolver: zodResolver(CreateSkillSchema),
    defaultValues: {},
  });
  const [createSkill] = useLazyCreateSkill();

  const onSubmit = async (newSkillData: CreateSkillForm) => {
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
      const response = await createSkill({
        variables: {
          skill: {
            name: newSkillData?.name || '',
            categoryId: newSkillData?.categoryId || '',
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
          <Typography variant="h4">{t('addSkill')}</Typography>
          <ClearIcon
            onClick={onClick}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </FormHeader>

        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <FormBody>
            <TextField
              {...register('name')}
              label={t('skillName')}
              placeholder={t('skillName')}
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            ></TextField>

            <TextField
              {...register('categoryId')}
              select
              label={t('category')}
              fullWidth
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message}
            >
              {dataCategories?.skillCategories.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>

            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: theme.spacing(5),
              }}
            >
              <Button onClick={onClick} variant="outlined">
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

export default CreateSkill;
