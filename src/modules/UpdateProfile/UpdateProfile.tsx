import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { useLazyDepartments } from '../../graphql/queries/departments';
import { useLazyPositions } from '../../graphql/queries/position';
import { useLazyUpdateProfile } from '../../graphql/mutations/updateProfile';
import { ButtonStack, Container, Form, FormBody, FormHeader } from './style';
import {
  UpdateProfileSchema,
  type DepartmentType,
  type PositionsType,
  type UpdateProfileData,
  type UpdateProfileProps,
} from './type';

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  onClick,
  user,
  onSuccess,
}) => {
  const [t] = useTranslation(['users', 'common']);
  const [updateProfile] = useLazyUpdateProfile();

  const [loadDepartments] = useLazyDepartments();
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [loadPositions] = useLazyPositions();
  const [positions, setPositions] = useState<PositionsType[]>([]);

  const getDepartments = async () => {
    try {
      const result = await loadDepartments();
      if (!result.data?.departments) return;
      setDepartments(result.data.departments);
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const getPositions = async () => {
    try {
      const result = await loadPositions();
      if (!result.data?.positions) return;
      setPositions(result.data.positions);
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
    getDepartments();
    getPositions();
  }, []);

  const { register, handleSubmit } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      userId: user.id,
      firstName: user.profile.first_name,
      lastName: user.profile.last_name,
    },
  });

  const onSubmit = async (data: UpdateProfileData) => {
    try {
      const response = await updateProfile({
        variables: {
          profile: {
            userId: data.userId,
            first_name: data.firstName,
            last_name: data.lastName,
          },
        },
      });

      if (!response.data) return;

      const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      const newUser = { ...currentUser, ...response.data.updateProfile };
      sessionStorage.setItem('user', JSON.stringify(newUser));

      onSuccess();

      toast.success('User updated successfully', {
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
      <Form>
        <FormHeader>
          <Typography variant="h6" textTransform="capitalize">
            {t('updateProfile')}
          </Typography>
          <CloseIcon onClick={onClick} sx={{ cursor: 'pointer' }} />
        </FormHeader>
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <FormBody>
            <Stack spacing={5} width="50%">
              <TextField
                select
                label={t('email')}
                fullWidth
                disabled
                defaultValue={user.email}
              />

              <TextField
                {...register('lastName')}
                label={t('lastName')}
                fullWidth
                defaultValue={user.profile.last_name || ''}
              />

              <TextField select label={t('department')} fullWidth disabled>
                {departments.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label={t('role')}
                fullWidth
                defaultValue={user.role}
              >
                <MenuItem key="admin" value="admin">
                  {t('common:admin')}
                </MenuItem>
                <MenuItem key="employee" value="employee">
                  {t('common:employee')}
                </MenuItem>
              </TextField>
            </Stack>
            <Stack spacing={5} width="50%">
              <TextField label={t('password')} type="password" fullWidth />
              <TextField
                {...register('firstName')}
                label={t('firstName')}
                fullWidth
                defaultValue={user.profile.first_name || ''}
              />
              <TextField select label={t('position')} fullWidth disabled>
                {positions.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </FormBody>
          <ButtonStack>
            <Button
              variant="contained"
              onClick={onClick}
              style={{ width: '50%' }}
            >
              {t('common:cancel')}
            </Button>
            <Button variant="outlined" type="submit" style={{ width: '50%' }}>
              {t('common:update')}
            </Button>
          </ButtonStack>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateProfile;
