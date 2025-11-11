import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { type Skill } from 'cv-graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyAddProfileSkill } from '../../graphql/mutations/addProfileSkill';
import { Bounce, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLazySkills } from '../../graphql/queries/skills';
import { useLazyProfile } from '../../graphql/queries/profile';
import {
  AddSkillContainer,
  AddSkillForm,
  ButtonStack,
  CloseIcon,
  FormBody,
  FormHeader,
} from './style';
import {
  AddSkillSchema,
  masteryKeys,
  type AddSkillData,
  type AddSkillProps,
} from './type';

const AddSkill: React.FC<AddSkillProps> = ({ onClick }) => {
  const [t] = useTranslation(['skills', 'common']);
  const { userId } = useParams<{ userId: string }>();

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
      userId: userId,
      categoryId: '',
      mastery: 'Novice',
      name: '',
    },
  });

  const [profile, { data }] = useLazyProfile();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await profile({
        variables: {
          userId: userId || '',
        },
      });

      if (!response.data) return;
      if (!response.data.profile.skills) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const [addProfileSkill] = useLazyAddProfileSkill();

  const onSubmit = async (newSkillData: AddSkillData) => {
    const hasSkill = data?.profile.skills.some(
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
      const response = await addProfileSkill({
        variables: {
          skill: {
            userId: userId || '',
            name: selectedSkill?.name || '',
            categoryId: selectedSkill?.category?.id || '',
            mastery: newSkillData.mastery,
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
    <AddSkillContainer>
      <AddSkillForm>
        <FormHeader>
          <Typography variant="h4">{t('skills:addSkill')}</Typography>
          <CloseIcon onClick={onClick} />
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
      </AddSkillForm>
    </AddSkillContainer>
  );
};

export default AddSkill;
