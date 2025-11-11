import React from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import { useLazyUpdateCv } from '../../graphql/mutations/updateCV';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonStack, FormBody } from './style';
import { CreateCVSchema, type CreateCVData, type UpdateCvProps } from './type';

const CvDetailsForm: React.FC<UpdateCvProps> = ({ cv }) => {
  const [t] = useTranslation(['common', 'CVs']);

  const user = JSON.parse(sessionStorage.getItem('user') || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateCVData>({
    resolver: zodResolver(CreateCVSchema),
    defaultValues: {
      cvId: cv.id,
      education: cv.education || '',
      description: cv.description || '',
      name: cv.name || '',
    },
  });

  const [createCv, { loading }] = useLazyUpdateCv();

  const onSubmit = async (newCV: CreateCVData) => {
    if (!(cv.user?.id === user.id || user.role === 'Admin')) {
      return toast.error(t('common:youDontHavePermission'), {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }

    try {
      const response = await createCv({
        variables: {
          cv: {
            cvId: cv.id || '',
            name: newCV?.name || '',
            description: newCV.description || '',
            education: newCV.education || '',
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
    currentValues.description !== cv.description ||
    currentValues.education !== cv.education ||
    currentValues.name !== cv.name;

  if (loading) return <CircularProgress />;

  return (
    <form
      style={{ width: '70%', maxWidth: 1000 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormBody>
        <TextField
          {...register('name')}
          label={t('CVs:cvName')}
          placeholder={t('CVs:cvName')}
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
        ></TextField>

        <TextField
          {...register('education')}
          label={t('CVs:education')}
          placeholder={t('CVs:education')}
          fullWidth
          error={!!errors.education}
          helperText={errors.education?.message}
        ></TextField>

        <TextField
          {...register('description')}
          label={t('CVs:description')}
          placeholder={t('CVs:description')}
          fullWidth
          rows={5}
          error={!!errors.description}
          helperText={errors.description?.message}
        ></TextField>
        {(cv.user?.id === user.id || user.role === 'Admin') && (
          <ButtonStack>
            <Button
              type={'submit'}
              variant="contained"
              loading={loading}
              disabled={!isChanged}
            >
              {t('update')}
            </Button>
          </ButtonStack>
        )}
      </FormBody>
    </form>
  );
};

export default CvDetailsForm;
