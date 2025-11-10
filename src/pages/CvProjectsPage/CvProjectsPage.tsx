import { lazy, Suspense, useEffect, useState } from 'react';
import { Container, HeaderPart, MainPart } from '../Components';
import SideBar from '../../components/SideBar/SideBar';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Search from '../../components/Search/Search';
import CvsHeader from '../../components/CvsHeader/CvsHeader';
import CvsNavigation from '../../components/CvsNavigation/CvsNavigation';
import { Bounce, toast } from 'react-toastify';
import { useLazyCvProjects } from '../../graphql/queries/cvProjects.ts';
import { useParams } from 'react-router-dom';
import { SerachBox, AddProjectButton } from './style';
import AddIcon from '@mui/icons-material/Add';

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

  const userData = sessionStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

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

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <SideBar active="cv"></SideBar>
      <MainPart>
        <HeaderPart>
          <CvsHeader cv={data?.cv.name || ' '}></CvsHeader>
          <CvsNavigation active="projects"></CvsNavigation>
          <SerachBox>
            <Search
              searchValue={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {(user.id === data?.cv?.user?.id || user.role === 'Admin') && (
              <AddProjectButton onClick={handleSetOpen}>
                <AddIcon />
                {t('projects:addProject')}
              </AddProjectButton>
            )}
          </SerachBox>
        </HeaderPart>
        {projects > 0 && (
          <Suspense>
            <ProjectsTable
              projects={data?.cv.projects || []}
              searchValue={searchValue}
              userId={data?.cv.user?.id || ''}
            />
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
