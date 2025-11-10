import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import { ActiveButton, CvsNavigationButtonGroup, DefButton } from './style';
import type { CvsHeaderProps } from './type';

const CvsNavigation: React.FC<CvsHeaderProps> = ({ active }) => {
  const navigate = useNavigate();
  const { cvId } = useParams<{ cvId: string }>();

  const { t } = useTranslation(['common', 'CVs']);
  return (
    <CvsNavigationButtonGroup variant="text">
      {active === 'details' ? (
        <ActiveButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Details.Create(cvId || ''))
          }
        >
          {' '}
          {t('CVs:details')}
        </ActiveButton>
      ) : (
        <DefButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Details.Create(cvId || ''))
          }
        >
          {' '}
          {t('CVs:details')}
        </DefButton>
      )}

      {active === 'skills' ? (
        <ActiveButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Skills.Create(cvId || ''))
          }
        >
          {t('skills')}
        </ActiveButton>
      ) : (
        <DefButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Skills.Create(cvId || ''))
          }
        >
          {t('skills')}
        </DefButton>
      )}

      {active === 'projects' ? (
        <ActiveButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Projects.Create(cvId || ''))
          }
        >
          {t('CVs:projects')}
        </ActiveButton>
      ) : (
        <DefButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Projects.Create(cvId || ''))
          }
        >
          {t('CVs:projects')}
        </DefButton>
      )}
      {active === 'preview' ? (
        <ActiveButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Preview.Create(cvId || ''))
          }
        >
          {t('CVs:preview')}
        </ActiveButton>
      ) : (
        <DefButton
          variant="text"
          onClick={() =>
            navigate(AppRoutes.Cvs.Children.Preview.Create(cvId || ''))
          }
        >
          {t('CVs:preview')}
        </DefButton>
      )}
    </CvsNavigationButtonGroup>
  );
};

export default CvsNavigation;
