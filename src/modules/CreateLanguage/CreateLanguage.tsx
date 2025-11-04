import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLazyCreateLanguage } from '../../graphql/mutations/createLanguage';

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

interface CreateLanguageProps {
  onClick: () => void;
}

interface CreateLangugeForm {
  name: string;
  native_name: string;
  iso: string;
}

const CreateLanguageSchema = z.object({
  name: z.string().nonempty(),
  native_name: z.string().nonempty(),
  iso: z.string().nonempty(),
});

const CreateLanguages: React.FC<CreateLanguageProps> = ({ onClick }) => {
  const [t] = useTranslation(['languages', 'common']);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const [createLanguage] = useLazyCreateLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLangugeForm>({
    resolver: zodResolver(CreateLanguageSchema),
    defaultValues: {},
  });

  const onSubmit = async (newLanguageData: CreateLangugeForm) => {
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
      const response = await createLanguage({
        variables: {
          language: {
            name: newLanguageData?.name || '',
            native_name: newLanguageData.native_name || '',
            iso2: newLanguageData.iso || '',
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
              label={t('common:language')}
              placeholder={t('common:language')}
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            ></TextField>

            <TextField
              {...register('native_name')}
              label={t('languages:nativeName')}
              placeholder={t('languages:nativeName')}
              fullWidth
              error={!!errors.native_name}
              helperText={errors.native_name?.message}
            ></TextField>

            <TextField
              {...register('iso')}
              label={t('languages:iso')}
              placeholder={t('languages:iso')}
              fullWidth
              error={!!errors.iso}
              helperText={errors.iso?.message}
            ></TextField>
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

export default CreateLanguages;
