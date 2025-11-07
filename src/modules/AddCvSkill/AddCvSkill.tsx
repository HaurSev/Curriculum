import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { useForm } from 'react-hook-form';
import { type Skill } from 'cv-graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useLazySkills } from '../../graphql/queries/skills';
import { useParams } from 'react-router-dom';
import { useLazyCvSkills } from '../../graphql/queries/cvSkills';
import { useLazyAddCvSkill } from '../../graphql/mutations/addCvSkill';
import {
  AddSkillContainer,
  AddSkillForm,
  FormBody,
  FormHeader,
} from './AddCvSkill';
import {
  AddSkillSchema,
  masteryKeys,
  type AddSkillData,
  type AddSkillProps,
} from './AddCvSkillType';

const AddCvSkill: React.FC<AddSkillProps> = ({ onClick }) => {
  const [t] = useTranslation(['skills', 'common']);

  const { cvId } = useParams<{ cvId: string }>();

  const [loadSkills] = useLazySkills();
  const [skills, setSkills] = useState<Skill[]>([]);

  const getSkills = async () => {
    try {
      const result = await loadSkills();
      if (!result.data?.skills) return;

      setSkills(result.data.skills);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSkillData>({
    resolver: zodResolver(AddSkillSchema),
    defaultValues: {
      cvId: cvId,
      categoryId: '',
      mastery: 'Novice',
      name: '',
    },
  });

  const [getSkill, { data }] = useLazyCvSkills();

  useEffect(() => {
    loadSkill();
  }, []);

  const loadSkill = async () => {
    try {
      const response = await getSkill({
        variables: {
          cvId: cvId || '',
        },
      });

      if (!response.data) return;
      if (!response.data.cv.skills) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const [addCvSkill] = useLazyAddCvSkill();

  const onSubmit = async (newSkillData: AddSkillData) => {
    const hasSkill = data?.cv.skills.some(
      (skill) =>
        skill.name === skills.find((s) => s.id === newSkillData.name)?.name,
    );

    if (hasSkill) {
      toast.error('You already have this skill', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    const selectedSkill = skills.find((s) => s.id === newSkillData.name);

    try {
      const response = await addCvSkill({
        variables: {
          skill: {
            cvId: cvId || '',
            name: selectedSkill?.name || '',
            categoryId: selectedSkill?.category?.id || '',
            mastery: newSkillData.mastery,
          },
        },
      });

      if (!response.data?.addCvSkill) return;

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
    <AddSkillContainer>
      <AddSkillForm>
        <FormHeader>
          <Typography variant="h4">{t('skills:addSkill')}</Typography>
          <ClearIcon
            onClick={onClick}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </FormHeader>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormBody>
            <TextField
              {...register('name')}
              select
              label={t('skill')}
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            >
              {skills.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              {...register('mastery')}
              placeholder={t('skillMastery')}
              select
              label={t('skillMastery')}
              fullWidth
              error={!!errors.mastery}
              helperText={errors.mastery?.message}
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
              <Button variant="outlined" onClick={onClick}>
                {t('common:cancel')}
              </Button>
              <Button type={'submit'} variant="contained">
                {t('common:confirm')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </AddSkillForm>
    </AddSkillContainer>
  );
};

export default AddCvSkill;
