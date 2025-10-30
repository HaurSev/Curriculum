import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { Controller, useForm } from 'react-hook-form';
import { type Skill, type SkillMastery } from 'cv-graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bounce, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazySkills } from '../../graphql/queries/skills';
import { useLazyUpdateProfileSkill } from '../../graphql/mutations/updateProfileSkill';

const UpdateSkillContainer = styled(Box)(({ theme }) => ({
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

const UpdateSkillForm = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 800,
  width: '80%',
  padding: theme.spacing(10),
  paddingTop: theme.spacing(4),
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

interface UpdateSkillProps {
  onClick: () => void;
  userSkill: SkillMastery;
}

interface UpdateSkillData {
  userId: string;
  name: string;
  mastery: 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';
}

const UpdateSkillSchema = z.object({
  userId: z.string(),
  name: z.string(),
  mastery: z.enum(['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert']),
});

const UpdateSkill: React.FC<UpdateSkillProps> = ({ onClick, userSkill }) => {
  const [t] = useTranslation(['skills', 'common']);
  const { userId } = useParams<{ userId: string }>();

  const masteryKeys = [
    'Novice',
    'Advanced',
    'Competent',
    'Proficient',
    'Expert',
  ];

  const [loadSkills] = useLazySkills();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');

  const getSkills = async () => {
    try {
      const result = await loadSkills();
      if (!result.data?.skills) return;

      setSkills(result.data.skills);

      const skill = result.data.skills.find((s) => s.name === userSkill.name);
      if (skill) {
        setSelectedSkillId(skill.id);
      }
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
    getSkills();
  }, []);

  const { control, handleSubmit, register, setValue } =
    useForm<UpdateSkillData>({
      resolver: zodResolver(UpdateSkillSchema),
      defaultValues: {
        userId: userId || '',
        name: '',
        mastery: userSkill.mastery,
      },
    });

  useEffect(() => {
    if (selectedSkillId) {
      setValue('name', selectedSkillId);
    }
  }, [selectedSkillId, setValue]);

  const [updateProfileSkill] = useLazyUpdateProfileSkill();

  const onSubmit = async (data: UpdateSkillData) => {
    const selectedSkill = skills.find((s) => s.id === data.name);

    if (!selectedSkill) {
      toast.error('Skill not found', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await updateProfileSkill({
        variables: {
          skill: {
            userId: userId || '',
            name: selectedSkill?.name || '',
            categoryId: selectedSkill?.category?.id || '',
            mastery: data.mastery,
          },
        },
      });

      if (!response.data) return;

      toast.success('Skill updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
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

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <UpdateSkillContainer>
      <UpdateSkillForm onClick={handleFormClick}>
        <FormHeader>
          <Typography variant="h4">{t('skills:updateSkill')}</Typography>
          <ClearIcon onClick={handleCloseClick} sx={{ cursor: 'pointer' }} />
        </FormHeader>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormBody>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label={t('skill')}
                  value={field.value || ''}
                >
                  {skills.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextField
              {...register('mastery')}
              placeholder={t('skillMastery')}
              select
              label={t('skillMastery')}
              fullWidth
              defaultValue={userSkill.mastery}
            >
              {masteryKeys.map((k) => (
                <MenuItem key={k} value={k}>
                  {k}
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
              <Button variant="outlined" onClick={handleCloseClick}>
                {t('common:cancel')}
              </Button>
              <Button type={'submit'} variant="contained">
                {t('common:update')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </UpdateSkillForm>
    </UpdateSkillContainer>
  );
};

export default UpdateSkill;
