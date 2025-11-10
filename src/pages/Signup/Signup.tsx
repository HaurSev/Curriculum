import { useTranslation } from 'react-i18next';
import AuthHeader from '../../components/AuthHeader/AuthHeader.tsx';
import SignupForm from '../../modules/SignupForm/SignupForm';
import { Typography } from '@mui/material';
import { Container, MainPart } from './style';

const Signup = () => {
  const { t } = useTranslation('authorisation');

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
