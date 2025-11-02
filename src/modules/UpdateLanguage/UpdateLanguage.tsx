import {
  Button,
  MenuItem,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import type { LanguageProficiency } from 'cv-graphql';
import theme from '../../theme/theme';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useLazyUpdateProfileLanguage } from '../../graphql/mutations/updateProfileLanguages';
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';

const UpdateLanguageContainer = styled(Box)(({ theme }) => ({
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

const UpdateLanguageForm = styled(Paper)(({ theme }) => ({
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

interface UpdateLanguageProps {
  onClick: () => void;
  userLanguage: LanguageProficiency;
}
const proficiencyKeys = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

interface UpdateLangugeForm {
  userId: string;
  name: string;
  proficiency: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

const UpdateLanguageSchema = z.object({
  userId: z.string(),
  name: z.string().nonempty(),
  proficiency: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native']),
});

const UpdateLanguage: React.FC<UpdateLanguageProps> = ({
  onClick,
  userLanguage,
}) => {
  const [t] = useTranslation(['common', 'languages']);
  const { userId } = useParams<{ userId: string }>();

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { handleSubmit, register } = useForm<UpdateLangugeForm>({
    resolver: zodResolver(UpdateLanguageSchema),
    defaultValues: {
      userId: userId || '',
      name: userLanguage.name || '',
      proficiency: userLanguage.proficiency || 'Native',
    },
  });

  const [updateProfileLanguage] = useLazyUpdateProfileLanguage();

  const onSubmit = async (data: UpdateLangugeForm) => {
    if (data.proficiency === userLanguage.proficiency) {
      toast.error(t('languages:notChange'), {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await updateProfileLanguage({
        variables: {
          language: {
            userId: userId || '',
            name: userLanguage?.name || '',
            proficiency: data.proficiency || 'Native',
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

  return (
    <UpdateLanguageContainer>
      <UpdateLanguageForm onClick={handleFormClick}>
        <FormHeader>
          <Typography variant="h4">{t('languages:updateLanguage')}</Typography>
          <ClearIcon onClick={handleCloseClick} sx={{ cursor: 'pointer' }} />
        </FormHeader>
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <FormBody>
            <TextField
              select
              fullWidth
              label={t('language')}
              defaultValue={userLanguage.name}
              disabled
            >
              <MenuItem value={userLanguage.name}>{userLanguage.name}</MenuItem>
            </TextField>

            <TextField
              {...register('proficiency')}
              placeholder={t('languages:languageProficiency')}
              select
              label={t('languages:languageProficiency')}
              fullWidth
              defaultValue={userLanguage.proficiency}
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
              <Button variant="outlined" onClick={handleCloseClick}>
                {t('common:cancel')}
              </Button>
              <Button type={'submit'} variant="contained">
                {t('common:update')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </UpdateLanguageForm>
    </UpdateLanguageContainer>
  );
};

export default UpdateLanguage;
