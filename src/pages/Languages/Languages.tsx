import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import { lazy, Suspense, useCallback, useState } from 'react';
import LanguagesTable from '../../modules/LanguagesTable/LanguagesTable';
import Search from '../../components/Search/Search';
import { Container, HeaderPart, MainPart } from '../Components';
import { PageTitle, HeaderContent, AddLanguageButton } from './style';
import AddIcon from '@mui/icons-material/Add';

const CreateLanguage = lazy(
  () => import('../../modules/CreateLanguage/CreateLanguage.tsx'),
);

const Languages = () => {
  const { t } = useTranslation(['languages', 'common']);
  const [searchValue, setSearchValue] = useState('');

  const [isAddOpen, setAddOpen] = useState(false);
  const handlSetAddOpen = () => {
    setAddOpen(!isAddOpen);
  };

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  return (
    <Container>
      <SideBar active="language" />
      <MainPart>
        <HeaderPart>
          <PageTitle>{t('common:languages')}</PageTitle>
          <HeaderContent>
            <Search searchValue={searchValue} onChange={handleSearchChange} />
            <AddLanguageButton onClick={handlSetAddOpen}>
              <AddIcon />
              {t('addLanguage')}
            </AddLanguageButton>
          </HeaderContent>
        </HeaderPart>
        <LanguagesTable searchValue={searchValue} />
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <CreateLanguage onClick={handlSetAddOpen} />
        </Suspense>
      )}
    </Container>
  );
};

export default Languages;
