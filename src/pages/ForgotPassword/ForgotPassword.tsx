import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ForgotForm from '../../modules/ForgotForm/ForgotForm.tsx';
import { Container, MainPart } from './style';

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
