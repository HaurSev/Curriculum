import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../router/router';
import { useTranslation } from 'react-i18next';
import { ActiveButton, CvsNavigationButtonGroup, DefButton } from './style';
import type { CvsHeaderProps } from './type';

const CvsNavigation: React.FC<CvsHeaderProps> = ({ active }) => {
  const navigate = useNavigate();
  const { cvId } = useParams<{ cvId: string }>();

  const handleDetailsNavigate = () => {
    navigate(AppRoutes.Cvs.Children.Details.Create(cvId || ''));
  };

  const handleSkillsNavigate = () => {
    navigate(AppRoutes.Cvs.Children.Skills.Create(cvId || ''));
  };

  const handleProjectNavigate = () => {
    navigate(AppRoutes.Cvs.Children.Projects.Create(cvId || ''));
  };

  const handlePreviewNavigate = () => {
    navigate(AppRoutes.Cvs.Children.Preview.Create(cvId || ''));
  };

  const { t } = useTranslation(['common', 'CVs']);
  return (
    <CvsNavigationButtonGroup variant="text">
      {active === 'details' ? (
        <ActiveButton variant="text" onClick={handleDetailsNavigate}>
          {t('CVs:details')}
        </ActiveButton>
      ) : (
        <DefButton variant="text" onClick={handleDetailsNavigate}>
          {t('CVs:details')}
        </DefButton>
      )}

      {active === 'skills' ? (
        <ActiveButton variant="text" onClick={handleSkillsNavigate}>
          {t('skills')}
        </ActiveButton>
      ) : (
        <DefButton variant="text" onClick={handleSkillsNavigate}>
          {t('skills')}
        </DefButton>
      )}

      {active === 'projects' ? (
        <ActiveButton variant="text" onClick={handleProjectNavigate}>
          {t('CVs:projects')}
        </ActiveButton>
      ) : (
        <DefButton variant="text" onClick={handleProjectNavigate}>
          {t('CVs:projects')}
        </DefButton>
      )}
      {active === 'preview' ? (
        <ActiveButton variant="text" onClick={handlePreviewNavigate}>
          {t('CVs:preview')}
        </ActiveButton>
      ) : (
        <DefButton variant="text" onClick={handlePreviewNavigate}>
          {t('CVs:preview')}
        </DefButton>
      )}
    </CvsNavigationButtonGroup>
  );
};

export default CvsNavigation;
