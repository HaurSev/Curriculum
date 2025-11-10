import React, { useState } from 'react';
import {
  ButtonStack,
  CloseIcon,
  Container,
  Form,
  FormBody,
  FormHeader,
  HorizontalStack,
} from './style';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import {
  type UpdateCvProjectProps,
  type UpdateCvProjectData,
  UpdateCvProjectSchema,
} from './type.ts';
import { useLazyUpdateCvProject } from '../../graphql/mutations/updateCvProject.ts';

const UpdateCvProject: React.FC<UpdateCvProjectProps> = ({
  onClick,
  project,
}) => {
  const [t] = useTranslation(['projects', 'common', 'CVs']);
  const { cvId } = useParams<{ cvId: string }>();
  const todayDate = new Date();
  const [inputValue, setInputValue] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateCvProjectData>({
    resolver: zodResolver(UpdateCvProjectSchema),
    defaultValues: {
      cvId: cvId || '',
      projectId: project.project.id || ' ',
      startDate: project.start_date || '',
      endDate: project.end_date || '',
      roles: project.roles || [],
      responsibilities: project.responsibilities || [],
    },
  });

  const [updateCvProject, { loading }] = useLazyUpdateCvProject();

  const onSubmit = async (data: UpdateCvProjectData) => {
    try {
      const response = await updateCvProject({
        variables: {
          project: {
            cvId: cvId || '',
            projectId: project.project.id || '',
            start_date: data.startDate || todayDate.toString() || '',
            end_date: data.endDate || 'still now',
            roles: data.roles || '',
            responsibilities: data.responsibilities || [],
          },
        },
      });

      if (!response.data || !response.data?.cv) return;

      toast.success(t('common:successfully'), {
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

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Form>
        <FormHeader>
          <Typography variant="h4">{t('common:update')}</Typography>
          <CloseIcon onClick={onClick} />
        </FormHeader>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormBody>
            <HorizontalStack>
              <TextField
                label={t('project')}
                fullWidth
                value={project.name}
                disabled
              />

              <TextField
                label={t('domain')}
                fullWidth
                disabled
                value={project?.domain || ''}
              />
            </HorizontalStack>
            <HorizontalStack>
              <TextField
                {...register('startDate')}
                type="date"
                fullWidth
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />

              <TextField
                {...register('endDate')}
                type="date"
                fullWidth
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            </HorizontalStack>
            <TextField
              placeholder={t('description')}
              label={t('description')}
              multiline
              rows={5}
              fullWidth
              disabled
              value={project?.description || ''}
            />
            <TextField
              label={t('environment')}
              fullWidth
              disabled
              value={project?.environment || ''}
            />

            <TextField
              label={t('responsibilities')}
              fullWidth
              multiline
              rows={3}
              error={!!errors.responsibilities}
              helperText={!!errors.responsibilities?.message}
              value={inputValue}
              onChange={(e) => {
                const text = e.target.value;
                setInputValue(text);

                if (/[,\s;]/.test(text[text.length - 1])) {
                  const value = text
                    .split(/[,;\s]+/)
                    .map((s) => s.trim())
                    .filter(Boolean);

                  setValue('responsibilities', value);
                }
              }}
              onBlur={() => {
                const value = inputValue
                  .split(/[,;\s]+/)
                  .map((s) => s.trim())
                  .filter(Boolean);

                setValue('responsibilities', value);
                setInputValue(value.join(', '));
              }}
            />
          </FormBody>

          <ButtonStack>
            <Button variant="outlined" onClick={onClick}>
              {t('common:cancel')}
            </Button>
            <Button type="submit" variant="contained">
              {t('common:confirm')}
            </Button>
          </ButtonStack>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateCvProject;
