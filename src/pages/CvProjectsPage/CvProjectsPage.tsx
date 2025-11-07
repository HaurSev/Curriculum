import { lazy, Suspense, useEffect, useState } from 'react';
import { Container, HeaderPart, MainPart } from '../Components';
import SideBar from '../../components/SideBar/SideBar';
import { Button } from '@mui/material';
import theme from '../../theme/theme';
import { useTranslation } from 'react-i18next';
import Search from '../../components/Search/Search';
import AddIcon from '@mui/icons-material/Add';
import CvsHeader from '../../components/CvsHeader/CvsHeader';
import CvsNavigation from '../../components/CvsNavigation/CvsNavigation';
import { Bounce, toast } from 'react-toastify';
import { SerachBox } from './CvProjectsPage.ts';
import { useLazyCvProjects } from '../../graphql/queries/cvProjects.ts';
import { useParams } from 'react-router-dom';

const ProjectsTable = lazy(
  () => import('../../modules/ProjectsTable/ProjectsTable.tsx'),
);
const AddCvProject = lazy(
  () => import('../../modules/AddCvProject/AddCvProject.tsx'),
);

const CvProjectsPage = () => {
  const [t] = useTranslation(['common', 'CVs', 'projects']);
  const [searchValue, setSearchValue] = useState('');
  const { cvId } = useParams<{ cvId: string }>();

  const user = JSON.parse(sessionStorage.getItem('user') || '');

  const [isAddOpen, setAddOpen] = useState(false);
  const handleSetOpen = () => {
    setAddOpen(!isAddOpen);
  };

  const [loadCvProjects, { loading, data }] = useLazyCvProjects();
  const [projects, setProjects] = useState(0);

  const getCvProjects = async () => {
    try {
      const result = await loadCvProjects({
        variables: {
          cvId: cvId || '',
        },
      });
      if (!result.data?.cv || !result.data.cv.projects) return;

      setProjects(result.data.cv.projects.length);
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    getCvProjects();
  }, [loadCvProjects]);

  if (loading) return <Button loading={loading}></Button>;

  return (
    <Container>
      <SideBar active="cv"></SideBar>
      <MainPart>
        <HeaderPart>
          <CvsHeader cv={'hello'}></CvsHeader>
          <CvsNavigation active="projects"></CvsNavigation>
          <SerachBox>
            <Search
              searchValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></Search>
            {(user.id === data?.cv?.user?.id || user.role === 'Admin') && (
              <Button
                sx={{
                  color: theme.palette.text.secondary,
                }}
                onClick={handleSetOpen}
              >
                <AddIcon />
                {t('projects:addProject')}
              </Button>
            )}
          </SerachBox>
        </HeaderPart>
        {projects > 0 && (
          <Suspense>
            <ProjectsTable
              projects={data?.cv.projects || []}
              searchValue={searchValue}
            ></ProjectsTable>
          </Suspense>
        )}
      </MainPart>
      {isAddOpen && (
        <Suspense>
          <AddCvProject onClick={handleSetOpen} />
        </Suspense>
      )}
    </Container>
  );
};

export default CvProjectsPage;
