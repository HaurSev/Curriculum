import { MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { useLazyUpdateUser } from '../../graphql/mutations/updateUser';
import { useLazyDepartments } from '../../graphql/queries/departments';
import { useLazyPositions } from '../../graphql/queries/position';
import {
  UpdateUserSchema,
  type DepartmentType,
  type PositionsType,
  type UpdateFormData,
  type UpdateUserProps,
} from './type';
import {
  Container,
  Form,
  FormHeader,
  FormTitle,
  CloseButton,
  FormContent,
  FormColumn,
  StyledTextField,
  ButtonContainer,
  CancelButton,
  SubmitButton,
} from './style';

const UpdateUser: React.FC<UpdateUserProps> = ({ onClick, user }) => {
  const [t] = useTranslation(['users', 'common']);
  const [updateUser] = useLazyUpdateUser();

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

  const { register, handleSubmit } = useForm<UpdateFormData>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      userId: user.id,
      departmentId: user.department_name || departments[0]?.id || '',
      positionId: user.position_name || positions[0]?.id || '',
      role: 'employee',
    },
  });

  const onSubmit = async (data: UpdateFormData) => {
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
          <FormTitle>{t('updateUser')}</FormTitle>
          <CloseButton onClick={onClick} />
        </FormHeader>
        <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <FormColumn>
              <StyledTextField
                select
                label={t('email')}
                fullWidth
                disabled
                defaultValue={user.email}
              />

              <StyledTextField
                label={t('lastName')}
                fullWidth
                defaultValue={user.profile.last_name || ''}
              />

              <StyledTextField
                select
                label={t('department')}
                fullWidth
                {...register('departmentId')}
              >
                {departments.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </StyledTextField>

              <StyledTextField
                select
                label={t('role')}
                fullWidth
                {...register('role')}
                defaultValue={user.role}
              >
                <MenuItem key="admin" value="admin">
                  admin
                </MenuItem>
                <MenuItem key="employee" value="employee">
                  employee
                </MenuItem>
              </StyledTextField>
            </FormColumn>
            <FormColumn>
              <StyledTextField
                label={t('password')}
                type="password"
                fullWidth
              />
              <StyledTextField
                label={t('firstName')}
                fullWidth
                defaultValue={user.profile.first_name || ''}
              />
              <StyledTextField
                select
                label={t('position')}
                fullWidth
                {...register('positionId')}
              >
                {positions.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name}
                  </MenuItem>
                ))}
              </StyledTextField>
            </FormColumn>
          </FormContent>
          <ButtonContainer>
            <CancelButton onClick={onClick}>{t('common:cancel')}</CancelButton>
            <SubmitButton type="submit">{t('common:update')}</SubmitButton>
          </ButtonContainer>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateUser;
