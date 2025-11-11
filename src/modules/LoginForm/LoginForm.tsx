import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useLazyLogin } from '../../graphql/queries/login';
import { TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { BoxForm, FormButton, FormPaper, FormStack } from './style';
import { LoginUserSchema, type LoginFormData } from './type';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(AppRoutes.ForgotPassword);
  };

  const { t } = useTranslation(['authorisation', 'common']);
  const [login, { loading }] = useLazyLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({
        variables: {
          auth: {
            email: data.email,
            password: data.password,
          },
        },
      });

      if (!response.data) return;

      const { email, id, role } = response.data.login.user;
      const { avatar, full_name, last_name, first_name } =
        response.data.login.user.profile;
      sessionStorage.setItem('access_token', response.data.login.access_token);
      sessionStorage.setItem(
        'refresh_token',
        response.data.login.refresh_token,
      );
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          id,
          email,
          role,
          full_name,
          avatar,
          first_name,
          last_name,
        }),
      );

      navigate(AppRoutes.Users.Path);
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
              {t('authorisation:login')}
            </FormButton>

            <FormButton
              variant="text"
              fullWidth
              disabled={loading}
              onClick={handleNavigate}
            >
              {t('forgotPassword')}
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </BoxForm>
  );
};

export default LoginForm;
