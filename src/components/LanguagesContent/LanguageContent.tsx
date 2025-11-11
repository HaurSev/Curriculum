import React, { lazy, Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import checkedLanguagesStore from '../../store/ckeckeLanguagesStore';
import {
  Container,
  Block,
  CheckedBlock,
  LanguageName,
  ProficiencyText,
} from './style.ts';
import type { LanguageBodyProps, LanguageContentProps } from './type.ts';

const UpdateLanguage = lazy(
  () => import('../../modules/UpdateProfileLanguage/UpdateProfileLanguage.tsx'),
);

const LanguageBody: React.FC<LanguageBodyProps> = ({ language }) => {
  const { userId } = useParams<{ userId: string }>();
  const user = sessionStorage.getItem('user');
  const userData = JSON.parse(user || '');

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isChecked, setCheck] = useState(false);

  const handleOpen = () => {
    setUpdateOpen(true);
  };
  const handleClose = () => {
    setUpdateOpen(false);
  };

  const addItem = checkedLanguagesStore((state) => state.addItem);
  const removeItem = checkedLanguagesStore((state) => state.removeItem);

  const handleCheckItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userId === userData.id || userData.role === 'Admin') {
      if (isChecked) {
        removeItem(language.name);
      } else {
        addItem(language);
      }
      setCheck(!isChecked);
    }
  };

  const LanguageBlock = isChecked ? CheckedBlock : Block;

  return (
    <LanguageBlock onClick={handleOpen} onContextMenu={handleCheckItem}>
      <ProficiencyText>{language.proficiency}</ProficiencyText>
      <LanguageName>{language.name}</LanguageName>
      {(userId === userData.id || userData.role === 'Admin') &&
        isUpdateOpen && (
          <Suspense>
            <UpdateLanguage onClick={handleClose} userLanguage={language} />
          </Suspense>
        )}
    </LanguageBlock>
  );
};

const SkillContent: React.FC<LanguageContentProps> = ({ languages }) => {
  return (
    <Container>
      {languages.map((lang) => (
        <LanguageBody key={lang.name} language={lang} />
      ))}
    </Container>
  );
};

export default SkillContent;
