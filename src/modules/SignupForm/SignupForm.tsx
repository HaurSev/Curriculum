import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLazySignup } from '../../graphql/mutations/signup';
import { TextField } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { BoxForm, FormButton, FormPaper, FormStack } from './style';
import { SignupUserSchema, type SignupFormData } from './type';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(SignupUserSchema) });

  const { t } = useTranslation(['authorisation', 'common']);
  const navigate = useNavigate();

  const [signup, { loading }] = useLazySignup();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup({
        variables: {
          auth: {
            email: data.email,
            password: data.password,
          },
        },
      });

      console.log('Signup result:', response.data);
      navigate(AppRoutes.Login);
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  const handleNavigate = () => {
    navigate(AppRoutes.Login);
  };

  return (
    <BoxForm>
      <FormPaper elevation={0}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormStack spacing={5}>
            <TextField
              {...register('email')}
              label={t('email')}
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              {...register('password')}
              label={t('password')}
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
            />

            <FormButton
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              fullWidth
              loading={loading}
            >
              {t('authorisation:createAccount')}
            </FormButton>

            <FormButton
              variant="text"
              fullWidth
              disabled={loading}
              onClick={handleNavigate}
            >
              {t('authorisation:haveAccount')}
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </BoxForm>
  );
};

export default SignupForm;
