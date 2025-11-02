import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { useLazyLanguages } from '../../graphql/queries/languages';
import { Bounce, toast } from 'react-toastify';
import { useLazyAddProfileLanguage } from '../../graphql/mutations/addProfileLanguage';
import { useParams } from 'react-router-dom';
import type { LanguageProficiency } from 'cv-graphql';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const AddLanguageContainer = styled(Box)(({ theme }) => ({
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

const AddLanguageForm = styled(Paper)(({ theme }) => ({
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

interface AddLanguageProps {
  onClick: () => void;
  userLanguages: LanguageProficiency[];
}

interface AddLangugeForm {
  userId: string;
  name: string;
  proficiency: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

const AddLanguageSchema = z.object({
  userId: z.string(),
  name: z.string().nonempty(),
  proficiency: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']),
});

const AddLanguages: React.FC<AddLanguageProps> = ({
  onClick,
  userLanguages,
}) => {
  const [t] = useTranslation(['languages', 'common']);
  const { userId } = useParams<{ userId: string }>();

  const proficiencyKeys = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

  const [getLanguages, { data }] = useLazyLanguages();

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      const result = await getLanguages();
      if (!result.data?.languages) return;
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const [addProfileLanguage] = useLazyAddProfileLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLangugeForm>({
    resolver: zodResolver(AddLanguageSchema),
    defaultValues: {
      userId: userId || '',
      name: '',
      proficiency: 'A1',
    },
  });

  const onSubmit = async (newLanguageData: AddLangugeForm) => {
    const hasSkill = userLanguages.some(
      (lang) =>
        lang.name ===
        userLanguages.find((s) => s.name === newLanguageData.name)?.name,
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

    try {
      const response = await addProfileLanguage({
        variables: {
          language: {
            userId: userId || '',
            name: newLanguageData?.name || '',
            proficiency: newLanguageData.proficiency || 'Native',
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
    <AddLanguageContainer>
      <AddLanguageForm>
        <FormHeader>
          <Typography variant="h4">{t('addLanguage')}</Typography>
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
              select
              label={t('common:language')}
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            >
              {data?.languages.map((lang) => (
                <MenuItem key={lang.id} value={lang.name}>
                  {lang.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              {...register('proficiency')}
              placeholder={t('languageProficiency')}
              select
              label={t('languageProficiency')}
              fullWidth
              error={!!errors.proficiency}
              helperText={errors.proficiency?.message}
            >
              {proficiencyKeys.map((k) => (
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
              <Button onClick={onClick} variant="outlined">
                {t('common:cancel')}
              </Button>
              <Button type={'submit'} variant="contained">
                {t('common:confirm')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </AddLanguageForm>
    </AddLanguageContainer>
  );
};

export default AddLanguages;
