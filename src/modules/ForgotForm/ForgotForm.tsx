import { useTranslation } from 'react-i18next';
import { AppRoutes } from '../../router/router';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import { useForgotPassword } from '../../graphql/mutations/forgotPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import theme from '../../theme/theme';
import { BoxForm, FormButton, FormPaper, FormStack } from './style';
import { ForgotPasswordSchema, type ForgotPasswordData } from './type';

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
    <BoxForm>
      <FormPaper elevation={0}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormStack spacing={theme.spacing(5)}>
            <TextField
              {...register('email')}
              label={t('email')}
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
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
              {t('authorisation:resetPassword')}
            </FormButton>

            <FormButton
              variant="outlined"
              fullWidth
              disabled={loading}
              onClick={handleNavigate}
            >
              {t('authorisation:cancel')}
            </FormButton>
          </FormStack>
        </form>
      </FormPaper>
    </BoxForm>
  );
};

export default ForgotForm;
