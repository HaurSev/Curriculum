import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import type { Skill } from 'cv-graphql';
import { Bounce, toast } from 'react-toastify';
import theme from '../../theme/theme';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazySkillCategories } from '../../graphql/queries/skillsCategory';
import { useLazyUpdateSkill } from '../../graphql/mutations/updateSkill';
import { Container, Form, FormBody, FormHeader } from './UpdateSkill';

interface UpdateSkillProps {
  onClick: () => void;
  skill: Skill;
}

interface UpdateSkillForm {
  skillId: string;
  name: string;
  categoryId: string;
}

const UpdateSkillSchema = z.object({
  name: z.string().nonempty(),
  skillId: z.string().nonempty(),
  categoryId: z.string().nonempty(),
});

const UpdateSkill: React.FC<UpdateSkillProps> = ({ onClick, skill }) => {
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
    watch,
  } = useForm<UpdateSkillForm>({
    resolver: zodResolver(UpdateSkillSchema),
    defaultValues: {
      name: skill.name,
      categoryId: skill.category?.id,
      skillId: skill.id,
    },
  });

  const [updateSkill] = useLazyUpdateSkill();

  const onSubmit = async (newSkillData: UpdateSkillForm) => {
    const hasChanges =
      newSkillData.name !== skill.name ||
      newSkillData.categoryId !== (skill.category?.id || '') ||
      newSkillData.skillId !== skill.id ||
      '';

    if (!hasChanges) {
      toast.info(t('common:cancel'), {
        position: 'top-center',
        autoClose: 4000,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

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
      const response = await updateSkill({
        variables: {
          skill: {
            name: newSkillData.name.trim(),
            skillId: newSkillData.skillId || '',
            categoryId: newSkillData.categoryId,
          },
        },
      });

      if (!response.data) return;

      toast.success(`${t('common:successfully')}`, {
        position: 'top-center',
        autoClose: 4000,
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

  const currentValues = watch();
  const isChanged =
    currentValues.name?.trim() !== skill.name?.trim() ||
    currentValues.categoryId !== (skill.category?.id || '');

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
              <Button type={'submit'} variant="contained" disabled={!isChanged}>
                {t('common:confirm')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateSkill;
