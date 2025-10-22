import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../theme/theme';
import ForgotForm from '../../modules/ForgotForm/ForgotForm';

const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',
}));

const MainPart = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(5),
  padding: theme.spacing(5),
  height: '80vh',
}));

const ForgotPassword = () => {
  const { t } = useTranslation('authorisation');
  return (
    <Container>
      <MainPart>
        <Typography variant="h1">{t('forgotPassword')}</Typography>
        <Typography variant="body1">{t('instruction')}</Typography>

        <ForgotForm />
      </MainPart>
    </Container>
  );
};

export default ForgotPassword;
