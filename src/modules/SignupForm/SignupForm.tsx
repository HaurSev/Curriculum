import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../graphql/mutations/signup';
import {
  Button,
  TextField,
  Paper,
  Stack,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type SignupFormData = {
  email: string;
  password: string;
};

const SignupUserSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({ resolver: zodResolver(SignupUserSchema) });

  const { t } = useTranslation(['authorisation', 'common']);
  const navigate = useNavigate();

  const [signup, { loading, error }] = useSignup();

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
      navigate(AppRoutes.LOGIN);
    } catch (error) {
      console.log('Signup error: ' + error);
    }
  };

  const handleNavigate = () => {
    navigate(AppRoutes.LOGIN);
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

            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {error.message}
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
                t('authorisation:createAccount')
              )}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              disabled={loading}
              onClick={handleNavigate}
            >
              {t('authorisation:haveAccount')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupForm;
