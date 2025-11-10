import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import { lazy, Suspense, useState } from 'react';
import SkillTable from '../../modules/SkillTable/SkillTable';
import { Container, HeaderPart, MainPart } from '../Components';
import AddIcon from '@mui/icons-material/Add';

import { PageTitle, HeaderContent, AddSkillButton } from './style';
import Search from '../../components/Search/Search.tsx';

const CreateSkill = lazy(
  () => import('../../modules/CreateSkill/CreateSkill.tsx'),
);

const Skills = () => {
  const { t } = useTranslation(['skills', 'common']);
  const [searchValue, setSearchValue] = useState('');

  const [isAddOpen, setAddOpen] = useState(false);
  const handlSetAddOpen = () => {
    setAddOpen(!isAddOpen);
  };

  return (
    <Container>
      <SideBar active="skills" />
      <MainPart>
        <HeaderPart>
          <PageTitle>{t('skills:skill')}</PageTitle>
          <HeaderContent>
            <Search
              searchValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></Search>
            <AddSkillButton onClick={handlSetAddOpen}>
              <AddIcon />
              {t('addSkill')}
            </AddSkillButton>
          </HeaderContent>
        </HeaderPart>
        <SkillTable searchValue={searchValue} />
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <CreateSkill onClick={handlSetAddOpen} />
        </Suspense>
      )}
    </Container>
  );
};

export default Skills;
