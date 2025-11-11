import React, { useEffect, useState } from 'react';
import {
  ButtonStack,
  Container,
  Form,
  FormBody,
  FormHeader,
  HorizontalStack,
} from './style';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {
  type AddCVProjectData,
  AddCvProjectSchema,
  type AddCvProjectProps,
} from './type';
import { useTranslation } from 'react-i18next';
import type { Project } from 'cv-graphql';
import { Bounce, toast } from 'react-toastify';
import { useLazyProjects } from '../../graphql/queries/projects';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useLazyAddCvProject } from '../../graphql/mutations/addCvProject';

const AddCvProject: React.FC<AddCvProjectProps> = ({ onClick, onSuccess }) => {
  const [t] = useTranslation(['projects', 'common', 'CVs']);
  const { cvId } = useParams<{ cvId: string }>();
  const todayDate = new Date();

  const [loadProjects, { loading }] = useLazyProjects();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);
  const [inputValue, setInputValue] = useState('');

  const getProjects = async () => {
    try {
      const result = await loadProjects();
      if (!result.data?.projects) return;
      setProjects(result.data.projects);
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddCVProjectData>({
    resolver: zodResolver(AddCvProjectSchema),
    defaultValues: {
      cvId: cvId || '',
      projectId: '',
      startDate: '',
      endDate: todayDate.toString() || '',
      roles: [],
      responsibilities: [],
    },
  });

  const [addCvProject] = useLazyAddCvProject();

  const onSubmit = async (data: AddCVProjectData) => {
    if (!selectedItem) {
      toast.error('select one', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
      });
      return;
    }

    try {
      const response = await addCvProject({
        variables: {
          project: {
            cvId: cvId || '',
            projectId: data.projectId || '',
            start_date: data.startDate || todayDate.toString() || '',
            end_date: data.endDate || 'still now',
            roles: data.roles || '',
            responsibilities: data.responsibilities || [],
          },
        },
      });

      if (!response.data || !response.data?.addCvProject.projects) return;
      onSuccess();

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

  if (loading) return <Button loading={loading}></Button>;

  return (
    <Container>
      <Form>
        <FormHeader>
          <Typography variant="h4">{t('addPproject')}</Typography>
          <ClearIcon
            onClick={onClick}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </FormHeader>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormBody>
            <HorizontalStack>
              <TextField
                select
                label={t('project')}
                fullWidth
                error={!!errors.projectId}
                helperText={errors.projectId?.message}
                {...register('projectId')}
                onChange={(e) => {
                  const selectedProject = projects.find(
                    (p) => p.id === e.target.value,
                  );
                  setSelectedItem(selectedProject || null);
                }}
              >
                {projects.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label={t('domain')}
                fullWidth
                disabled
                value={selectedItem?.domain || ''}
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
              label={t('description')}
              multiline
              rows={5}
              fullWidth
              disabled
              value={selectedItem?.description || ''}
            />
            <TextField
              label={t('environment')}
              fullWidth
              disabled
              value={selectedItem?.environment || ''}
            />

            <TextField
              label={t('responsibilities')}
              fullWidth
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

export default AddCvProject;
