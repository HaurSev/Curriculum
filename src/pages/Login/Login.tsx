import AuthHeader from '../../components/AuthHeader/AuthHeader';
import LoginForm from '../../modules/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const Login = () => {
  const Container = styled.div`
    background: var(--base-color);
    color: var(--def-text-color);
    width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const MainPart = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    height: 80vh;
  `;

  const { t } = useTranslation('authorisation');

  return (
    <Container>
      <AuthHeader active={'login'} />
      <MainPart>
        <Typography
          variant="h1"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 300,
          }}
        >
          {t('welcome')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'var(--def-text-color)',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          {t('helloAgain')}
        </Typography>

        <LoginForm />
      </MainPart>
    </Container>
  );
};

export default Login;
