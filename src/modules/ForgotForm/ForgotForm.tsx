import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/system';
import { Paper, TextField } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import * as z from 'zod';
import { useForgotPassword } from '../../graphql/mutations/forgotPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import theme from '../../theme/theme';

type ForgotPasswordData = {
  email: string;
};

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
});

const ForgotForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { t } = useTranslation(['authorisation', 'common']);
  const navigate = useNavigate();

  const [forgotPassword, { loading }] = useForgotPassword();

  const handleNavigate = () => {
    navigate(AppRoutes.Login);
  };

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const response = await forgotPassword({
        variables: {
          auth: {
            email: data.email,
          },
        },
      });

      toast.success(`We sent an email!`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
      console.log(response);
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
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={theme.spacing(5)}
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
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              fullWidth
              sx={{ height: 45, width: 210 }}
              loading={loading}
            >
              {t('authorisation:resetPassword')}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              disabled={loading}
              onClick={handleNavigate}
              sx={{ height: 45, width: 210 }}
            >
              {t('authorisation:cancel')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotForm;
