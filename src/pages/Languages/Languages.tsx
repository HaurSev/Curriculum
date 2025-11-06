import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import { Box, Button, Typography } from '@mui/material';
import theme from '../../theme/theme';
import { lazy, Suspense, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import LanguagesTable from '../../modules/LanguagesTable/LanguagesTable';
import Search from '../../components/Search/Search';
import { Container, HeaderPart, MainPart } from '../Components';
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

  return (
    <Container>
      <SideBar active="language" />
      <MainPart>
        <HeaderPart>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.disabled }}
          >
            {t('common:languages')}
          </Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: theme.spacing(5),
            }}
          >
            <Search
              searchValue={searchValue}
              onClick={(e) => setSearchValue(e.target.value)}
            ></Search>

            <Button
              sx={{
                gap: theme.spacing(3),
                color: theme.palette.text.secondary,
              }}
              onClick={handlSetAddOpen}
            >
              <AddIcon />
              {t('addLanguage')}
            </Button>
          </Box>
        </HeaderPart>
        <LanguagesTable searchValue={searchValue}></LanguagesTable>
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <CreateLanguage onClick={handlSetAddOpen}></CreateLanguage>
        </Suspense>
      )}
    </Container>
  );
};

export default Languages;
