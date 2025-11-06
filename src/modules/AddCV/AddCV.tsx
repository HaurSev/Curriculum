import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import * as z from 'zod';
import { Form, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyCreateCv } from '../../graphql/mutations/createCV';
import { Bounce, toast } from 'react-toastify';
import { Container, FormBody, FormHeader } from './AddCV';

interface AddCVProps {
  onClick: () => void;
}

const CreateCVSchema = z.object({
  name: z.string(),
  education: z.string().optional(),
  description: z.string().nonempty(),
  userId: z.string().optional(),
});

interface CreateCVData {
  name: string;
  education?: string;
  description: string;
  userId?: string;
}

const AddCV: React.FC<AddCVProps> = ({ onClick }) => {
  const [t] = useTranslation(['common', 'CVs']);
  const { userId } = useParams<{ userId: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCVData>({
    resolver: zodResolver(CreateCVSchema),
    defaultValues: {
      userId: userId,
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
            userId: userId || '',
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

          <ClearIcon
            onClick={onClick}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </FormHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
      </Form>
    </Container>
  );
};

export default AddCV;
