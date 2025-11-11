import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyUpdateLanguage } from '../../graphql/mutations/updateLanguage';
import { ButtonStack, CloseIcon, Form, FormBody, FormHeader } from './style';
import {
  CreateLanguageSchema,
  type CreateLanguageForm,
  type UpdateLanguageProps,
} from './type';

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
          <CloseIcon onClick={onClick} />
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

            <ButtonStack>
              <Button onClick={onClick} variant="outlined">
                {t('common:cancel')}
              </Button>
              <Button type="submit" variant="contained" disabled={!isChanged}>
                {t('common:confirm')}
              </Button>
            </ButtonStack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateLanguage;
