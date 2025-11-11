import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import theme from '../../theme/theme';
import { useForm } from 'react-hook-form';
import { useLazyUpdateProfileLanguage } from '../../graphql/mutations/updateProfileLanguages';
import { useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Form, FormBody, FormHeader } from './style';
import {
  proficiencyKeys,
  UpdateLanguageSchema,
  type UpdateLanguageProps,
  type UpdateLangugeForm,
} from './type';

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
    <Container>
      <Form onClick={handleFormClick}>
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
      </Form>
    </Container>
  );
};

export default UpdateLanguage;
