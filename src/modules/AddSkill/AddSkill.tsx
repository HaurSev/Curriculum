import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';

const AddSkillContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100vh',
  zIndex: 100,
  background: 'rgba(0,0,0,0.8)',
  position: 'absolute',
}));

const AddSkillForm = styled(Paper)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 800,
  width: '80%',
  padding: theme.spacing(10),
  paddingTop: theme.spacing(4),
}));

const FormHeader = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
}));

const FormBody = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  gap: theme.spacing(5),
  paddingTop: theme.spacing(2),
}));

interface AddSkillProps {
  onClick: () => void;
}

const AddSkill: React.FC<AddSkillProps> = ({ onClick }) => {
  const [t] = useTranslation(['skills', 'common']);
  return (
    <AddSkillContainer>
      <AddSkillForm>
        <FormHeader>
          <Typography variant="h4">{t('skills:addSkill')}</Typography>
          <ClearIcon onClick={onClick} />
        </FormHeader>

        <form style={{ width: '100%' }}>
          <FormBody>
            <TextField placeholder={t('skill')} label={t('skill')} />

            <TextField
              placeholder={t('skillMastery')}
              label={t('skillMastery')}
            />
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: theme.spacing(5),
              }}
            >
              <Button variant="outlined" onClick={onClick}>
                {t('common:cancel')}
              </Button>
              <Button variant="contained">{t('common:update')}</Button>
            </Stack>
          </FormBody>
        </form>
      </AddSkillForm>
    </AddSkillContainer>
  );
};

export default AddSkill;
