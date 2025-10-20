import { useTranslation } from 'react-i18next';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import SignupForm from '../../modules/SignupForm/SignupForm';
import { styled, Typography } from '@mui/material';

const Signup = () => {
  const { t } = useTranslation('authorisation');

  const Container = styled('div')`
    background: var(--base-color);
    color: var(--def-text-color);
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const MainPart = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    height: 80vh;
  `;

  return (
    <Container>
      <AuthHeader active={'signup'} />
      <MainPart>
        <Typography
          variant="h1"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 300,
          }}
        >
          {t('registerNow')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'var(--def-text-color)',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          {t('welcomeSignup')}
        </Typography>

        <SignupForm />
      </MainPart>
    </Container>
  );
};

export default Signup;
