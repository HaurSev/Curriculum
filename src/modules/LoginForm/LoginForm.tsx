import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../graphql/queries/login';
import useErrorStore from '../../store/errorStore';
import {
  Button,
  TextField,
  Paper,
  Stack,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CombinedGraphQLErrors } from '@apollo/client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginUserSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
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

  const { t } = useTranslation(['authorisation', 'common']);
  const [login, { loading, error }] = useLogin();
  const { message, setError } = useErrorStore();

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

      const { email, id } = response.data.login.user;
      sessionStorage.setItem('access_token', response.data.login.access_token);
      sessionStorage.setItem(
        'refresh_token',
        response.data.login.refresh_token,
      );
      sessionStorage.setItem('user', JSON.stringify({ id, email }));
    } catch {
      if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message }) => setError(message));
      }
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
          <Stack spacing={3}>
            <TextField
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: t('common:invalidEmail') || 'Invalid email address',
                },
              })}
              label={t('email')}
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={loading}
            />

            <TextField
              {...register('password', {
                required: 'Password is required',
              })}
              label={t('password')}
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={loading}
            />

            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {message}
              </Alert>
            )}

            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              fullWidth
              sx={{ height: 45 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t('authorisation:login')
              )}
            </Button>

            <Button variant="outlined" fullWidth disabled={loading}>
              {t('forgotPassword')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
