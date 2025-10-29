import { Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bounce, toast } from 'react-toastify';
// import { useLazyUpdateUser } from '../../graphql/mutations/updateUser';
import type { UserData } from '../../graphql/queries/users';
import { useLazyDepartments } from '../../graphql/queries/departments';
import { useLazyPositions } from '../../graphql/queries/position';
import { useLazyUpdateProfile } from '../../graphql/mutations/updateProfile';
import theme from '../../theme/theme';

const UpdateProfileContainer = styled(Box)(({ theme }) => ({
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

const UpdateProfileForm = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 800,
  width: '80%',
  padding: theme.spacing(5),
}));

interface UpdateProfileProps {
  onClick: () => void;
  user: UserData;
}

type UpdateProfileData = {
  userId: string;
  firstName: string;
  lastName: string;
};

type DepartmentType = {
  id: string;
  name: string;
};
type PositionsType = {
  id: string;
  name: string;
};

const UpdateProfileSchema = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const UpdateProfile: React.FC<UpdateProfileProps> = ({ onClick, user }) => {
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
      toast.success('User updated successfully', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
      console.log('Updated user:', response.data);
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
    <UpdateProfileContainer>
      <UpdateProfileForm>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" textTransform="capitalize">
            {t('updateProfile')}
          </Typography>
          <CloseIcon onClick={onClick} sx={{ cursor: 'pointer' }} />
        </Box>

        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(5),

              marginBottom: theme.spacing(5),
            }}
          >
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
                  admin
                </MenuItem>
                <MenuItem key="employee" value="employee">
                  employee
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
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={onClick}
            sx={{ width: '45%' }}
          >
            {t('common:cancel')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            type="submit"
            sx={{ width: '45%' }}
          >
            {t('common:update')}
          </Button>
        </form>
      </UpdateProfileForm>
    </UpdateProfileContainer>
  );
};

export default UpdateProfile;
