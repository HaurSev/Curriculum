import AuthHeader from '../../components/AuthHeader/AuthHeader';
import LoginForm from '../../modules/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import { Box, styled, Typography } from '@mui/material';

const Login = () => {
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
      <AuthHeader active={'login'} />
      <MainPart>
        <Typography variant="h1">{t('welcome')}</Typography>
        <Typography variant="body1">{t('helloAgain')}</Typography>

        <LoginForm />
      </MainPart>
    </Container>
  );
};

export default Login;
