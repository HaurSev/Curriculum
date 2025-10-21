import { useTranslation } from 'react-i18next';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import SignupForm from '../../modules/SignupForm/SignupForm';
import { Box, styled, Typography } from '@mui/material';

const Signup = () => {
  const { t } = useTranslation('authorisation');

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
    gap: '20px',
    padding: '20px',
    height: '80vh',
  }));

  return (
    <Container>
      <AuthHeader active={'signup'} />
      <MainPart>
        <Typography variant="h1">{t('registerNow')}</Typography>
        <Typography variant="body1">{t('welcomeSignup')}</Typography>

        <SignupForm />
      </MainPart>
    </Container>
  );
};

export default Signup;
