import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useLazyLogin } from '../../graphql/queries/login';
import { Button, TextField, Paper, Stack, Box } from '@mui/material';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginUserSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginUserSchema),
  });

  const navigate = useNavigate();

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
      sessionStorage.setItem('access_token', response.data.login.access_token);
      sessionStorage.setItem(
        'refresh_token',
        response.data.login.refresh_token,
      );
      sessionStorage.setItem('user', JSON.stringify({ id, email, role }));

      navigate(AppRoutes.USERS.path);
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        className="authForm"
        sx={{ width: '100%', maxWidth: 600 }}
        elevation={0}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={5}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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

            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              fullWidth
              sx={{ height: 45, width: 210 }}
              loading={loading}
            >
              {t('authorisation:login')}
            </Button>

            <Button
              variant="text"
              fullWidth
              disabled={loading}
              sx={{ height: 45, width: 210 }}
              onClick={() => navigate(AppRoutes.FORGOT_PASWORD)}
            >
              {t('forgotPassword')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
