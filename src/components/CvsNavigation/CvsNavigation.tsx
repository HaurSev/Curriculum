import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';

interface CvsHeaderProps {
  active: 'details' | 'skills' | 'projects' | 'preview';
}

const CvsNavigation: React.FC<CvsHeaderProps> = ({ active }) => {
  const navigate = useNavigate();
  const { cvId } = useParams<{ cvId: string }>();

  const { t } = useTranslation(['common', 'CVs']);
  return (
    <ButtonGroup
      variant="text"
      sx={{
        width: '100%',
        justifyContent: 'flex-start',
        gap: 2,
        '& .MuiButton-root': {
          width: 200,
          fontSize: 14,
          paddingY: theme.spacing(4),
        },
      }}
    >
      <Button
        variant="text"
        onClick={() =>
          navigate(AppRoutes.CVS.Children.DETAILS.create(cvId || ''))
        }
        sx={{
          color:
            active === 'details'
              ? theme.palette.text.secondary
              : theme.palette.text.disabled,
          borderBottom:
            active === 'details'
              ? `2px solid ${theme.palette.text.secondary}`
              : 'none',

          borderRadius: 0,
        }}
      >
        {t('CVs:details')}
      </Button>

      <Button
        variant="text"
        onClick={() =>
          navigate(AppRoutes.CVS.Children.SKILLS.create(cvId || ''))
        }
        sx={{
          color:
            active === 'skills'
              ? theme.palette.text.secondary
              : theme.palette.text.disabled,
          borderBottom:
            active === 'skills'
              ? `2px solid ${theme.palette.text.secondary}`
              : 'none',
          borderRadius: 0,
        }}
      >
        {t('skills')}
      </Button>
      <Button
        variant="text"
        sx={{
          color:
            active === 'projects'
              ? theme.palette.text.secondary
              : theme.palette.text.disabled,
          borderBottom:
            active === 'projects'
              ? `2px solid ${theme.palette.text.secondary}`
              : 'none',
          borderRadius: 0,
        }}
      >
        {t('CVs:projects')}
      </Button>
      <Button
        variant="text"
        sx={{
          color:
            active === 'preview'
              ? theme.palette.text.secondary
              : theme.palette.text.disabled,
          borderBottom:
            active === 'preview'
              ? `2px solid ${theme.palette.text.secondary}`
              : 'none',
          borderRadius: 0,
        }}
      >
        {t('CVs:preview')}
      </Button>
    </ButtonGroup>
  );
};

export default CvsNavigation;
