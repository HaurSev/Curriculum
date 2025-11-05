import {
  Box,
  Button,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import type { Language } from 'cv-graphql';
import { Bounce, toast } from 'react-toastify';
import theme from '../../theme/theme';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyUpdateLanguage } from '../../graphql/mutations/updateLanguage';

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
  position: 'fixed',
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
  opacity: 0.9,
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
  language: Language;
}

interface CreateLanguageForm {
  name: string;
  native_name: string;
  iso: string;
}

const CreateLanguageSchema = z.object({
  name: z.string().nonempty(),
  native_name: z.string().nonempty(),
  iso: z.string().nonempty(),
});

const UpdateLanguage: React.FC<UpdateLanguageProps> = ({
  onClick,
  language,
}) => {
  const [t] = useTranslation(['languages', 'common']);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateLanguageForm>({
    resolver: zodResolver(CreateLanguageSchema),
    defaultValues: {
      name: language.name,
      native_name: language.native_name || '',
      iso: language.iso2,
    },
  });

  const [updateLanguage] = useLazyUpdateLanguage();

  const onSubmit = async (newLanguageData: CreateLanguageForm) => {
    const hasChanges =
      newLanguageData.name !== language.name ||
      newLanguageData.native_name !== (language.native_name || '') ||
      newLanguageData.iso !== language.iso2;

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
      const response = await updateLanguage({
        variables: {
          language: {
            languageId: language.id,
            name: newLanguageData.name.trim(),
            native_name: newLanguageData.native_name.trim(),
            iso2: newLanguageData.iso.trim(),
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
    currentValues.name !== language.name ||
    currentValues.native_name !== (language.native_name || '') ||
    currentValues.iso !== language.iso2;

  return (
    <Container>
      <Form>
        <FormHeader>
          <Typography>{t('updateLanguage')}</Typography>
          <ClearIcon
            onClick={onClick}
            sx={{
              cursor: 'pointer',
              ':hover': {
                color: theme.palette.error.main,
              },
            }}
          />
        </FormHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBody>
            <TextField
              {...register('name')}
              label={t('common:language')}
              placeholder={t('common:language')}
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              {...register('native_name')}
              label={t('languages:nativeName')}
              placeholder={t('languages:nativeName')}
              fullWidth
              error={!!errors.native_name}
              helperText={errors.native_name?.message}
            />

            <TextField
              {...register('iso')}
              label={t('languages:iso')}
              placeholder={t('languages:iso')}
              fullWidth
              error={!!errors.iso}
              helperText={errors.iso?.message}
            />

            <Stack
              direction="row"
              justifyContent="flex-end"
              gap={5}
              sx={{ width: '100%' }}
            >
              <Button onClick={onClick} variant="outlined">
                {t('common:cancel')}
              </Button>
              <Button type="submit" variant="contained" disabled={!isChanged}>
                {t('common:confirm')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateLanguage;
