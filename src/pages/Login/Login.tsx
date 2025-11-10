import AuthHeader from '../../components/AuthHeader/AuthHeader.tsx';
import LoginForm from '../../modules/LoginForm/LoginForm.tsx';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Container, MainPart } from './style';

const Login = () => {
  const { t } = useTranslation('authorisation');

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
