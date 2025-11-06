import React from 'react';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import * as z from 'zod';
import { useLazyDepartments } from '../../graphql/queries/departments';
import { useLazyPositions } from '../../graphql/queries/position';
import { useForm } from 'react-hook-form';
import theme from '../../theme/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyUpdateUser } from '../../graphql/mutations/updateUser';
import { FormContainer } from './UserUpdateProfile';

type DepartmentType = {
  id: string;
  name: string;
};

type PositionsType = {
  id: string;
  name: string;
};

interface UpdateUserProfileProps {
  userId: string;
  first_name: string;
  last_name: string;
  position_name: string;
  department_name: string;
}

interface UpdatePositionDepartmentDate {
  userId: string;
  positionId: string;
  departmentId: string;
}

const UpdatePositionDepartmentSchema = z.object({
  userId: z.string(),
  departmentId: z.string(),
  positionId: z.string(),
});

const AdminUpdateProfile: React.FC<UpdateUserProfileProps> = ({
  userId,
  first_name,
  last_name,
  position_name,
  department_name,
}) => {
  const [t] = useTranslation();

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

  const [updateUser] = useLazyUpdateUser();

  const [initialValues, setInitialValues] =
    useState<UpdatePositionDepartmentDate>({
      userId,
      departmentId: '',
      positionId: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdatePositionDepartmentDate>({
    resolver: zodResolver(UpdatePositionDepartmentSchema),
    defaultValues: {
      userId: userId || '',
      departmentId: '',
      positionId: '',
    },
  });

  useEffect(() => {
    if (departments.length && positions.length) {
      const selectedDepartment =
        departments.find((d) => d.name === department_name)?.id ||
        departments[0].id;

      const selectedPosition =
        positions.find((p) => p.name === position_name)?.id || positions[0].id;

      const newValues = {
        userId,
        departmentId: selectedDepartment,
        positionId: selectedPosition,
      };

      reset(newValues);
      setInitialValues(newValues);
    }
  }, [departments, positions, department_name, position_name, userId, reset]);

  const onSubmit = async (data: UpdatePositionDepartmentDate) => {
    if (
      data.departmentId === initialValues.departmentId &&
      data.positionId === initialValues.positionId
    ) {
      toast.info('No changes detected', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }
    try {
      const response = await updateUser({
        variables: {
          user: {
            userId: data.userId,
            departmentId: data.departmentId,
            positionId: data.positionId,
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
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const userJson = sessionStorage.getItem('user') || '';
  const userData = JSON.parse(userJson);
  return (
    <FormContainer>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(5),
          }}
        >
          <TextField
            label={t('firstName')}
            defaultValue={first_name || ''}
            disabled
          />
          <TextField
            label={t('lastName')}
            disabled
            defaultValue={last_name || ''}
          />
        </Stack>

        {userId === userData.id || userData.role === 'Admin' ? (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(5),
              marginTop: theme.spacing(3),
            }}
          >
            <TextField
              select
              label={t('department')}
              fullWidth
              error={!!errors.departmentId}
              value={watch('departmentId') || ''}
              {...register('departmentId')}
            >
              {departments.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label={t('position')}
              fullWidth
              error={!!errors.positionId}
              value={watch('positionId') || ''}
              {...register('positionId')}
            >
              {positions.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        ) : (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(5),
              marginTop: theme.spacing(3),
            }}
          >
            <TextField
              label={t('department')}
              fullWidth
              disabled
              defaultValue={department_name}
            ></TextField>

            <TextField
              label={t('position')}
              fullWidth
              disabled
              defaultValue={position_name}
            ></TextField>
          </Stack>
        )}

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{
            marginTop: theme.spacing(3),
          }}
        >
          <Button
            type="submit"
            color="primary"
            sx={{
              width: 'fit-content',
            }}
          >
            {t('update')}
          </Button>
        </Stack>
      </form>
    </FormContainer>
  );
};

export default AdminUpdateProfile;
