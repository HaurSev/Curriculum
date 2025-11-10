import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';
import { useLazyDepartments } from '../../graphql/queries/departments';
import { useLazyPositions } from '../../graphql/queries/position';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyUpdateUser } from '../../graphql/mutations/updateUser';
import {
  UpdatePositionDepartmentSchema,
  type DepartmentType,
  type PositionsType,
  type UpdatePositionDepartmentDate,
  type UpdateUserProfileProps,
} from './type';
import {
  FormContainer,
  FormStack,
  FormFieldsStack,
  ButtonStack,
  SubmitButton,
} from './style';

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
        <FormStack>
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
        </FormStack>

        {userId === userData.id || userData.role === 'Admin' ? (
          <FormFieldsStack>
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
          </FormFieldsStack>
        ) : (
          <FormFieldsStack>
            <TextField
              label={t('department')}
              fullWidth
              disabled
              defaultValue={department_name}
            />
            <TextField
              label={t('position')}
              fullWidth
              disabled
              defaultValue={position_name}
            />
          </FormFieldsStack>
        )}

        <ButtonStack>
          <SubmitButton type="submit">{t('update')}</SubmitButton>
        </ButtonStack>
      </form>
    </FormContainer>
  );
};

export default AdminUpdateProfile;
