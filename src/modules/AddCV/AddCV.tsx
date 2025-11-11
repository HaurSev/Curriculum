import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyCreateCv } from '../../graphql/mutations/createCV';
import { Bounce, toast } from 'react-toastify';
import {
  ButtonStack,
  CloseIcon,
  Container,
  FormBody,
  FormHeader,
  Form,
} from './style';
import { CreateCVSchema, type AddCVProps, type CreateCVData } from './type';

const AddCV: React.FC<AddCVProps> = ({ onClick, onCreated }) => {
  const [t] = useTranslation(['common', 'CVs']);
  const userData = sessionStorage.getItem('user');
  const user = JSON.parse(userData || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCVData>({
    resolver: zodResolver(CreateCVSchema),
    defaultValues: {
      userId: user.id,
      education: '',
      description: '',
      name: '',
    },
  });

  const [createCv] = useLazyCreateCv();

  const onSubmit = async (newCV: CreateCVData) => {
    try {
      const response = await createCv({
        variables: {
          cv: {
            userId: user.id || '',
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
      onCreated(response?.data?.createCv);

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
      <Form>
        <FormHeader>
          <Typography variant="h4"> {t('CVs:createCV')}</Typography>

          <CloseIcon onClick={onClick} />
        </FormHeader>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
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
      </Form>
    </Container>
  );
};

export default AddCV;
