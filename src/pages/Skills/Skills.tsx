import { useTranslation } from 'react-i18next';
import SideBar from '../../components/SideBar/SideBar';
import { Box, Button, InputBase, styled, Typography } from '@mui/material';
import theme from '../../theme/theme';
import SearchIcon from '@mui/icons-material/Search';
import { lazy, Suspense, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SkillTable from '../../modules/SkillTable/SkillTable';

const CreateSkill = lazy(() => import('../../modules/CreateSkill/CreateSkill'));

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  minHeight: '100vh',
}));

const MainPart = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(3),
  elevation: 0,
  gap: theme.spacing(2),
}));

const HeaderPart = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: theme.spacing(3),
  width: '100%',
  paddingLeft: theme.spacing(5),
  elevation: 0,
}));

const Search = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(5),
  backgroundColor: 'transparent',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transition: '0.4s ease',
  },
  marginLeft: 0,
  width: '600px',
  height: theme.spacing(10),
  border: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '400px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.disabled }}
          >
            {t('skills:skill')}
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
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Search>
            <Button
              sx={{
                gap: theme.spacing(3),
                color: theme.palette.text.secondary,
              }}
              onClick={handlSetAddOpen}
            >
              <AddIcon />
              {t('addSkill')}
            </Button>
          </Box>
        </HeaderPart>
        <SkillTable searchValue={searchValue}></SkillTable>
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
