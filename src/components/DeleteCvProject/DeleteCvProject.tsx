import { Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import { Bounce, toast } from 'react-toastify';
import {
  Container,
  Form,
  FormBody,
  FormHeader,
  HorizontalStack,
} from './DeleteCvProject';
import { useLazyRemoveCvProject } from '../../graphql/mutations/removeCvProject';
import { useParams } from 'react-router-dom';

interface DeleteCvProjectProps {
  onClick: () => void;
  projectId: string;
  projectName: string;
}

const DeleteCvProject: React.FC<DeleteCvProjectProps> = ({
  onClick,
  projectId,
  projectName,
}) => {
  const [t] = useTranslation(['common', 'projects']);
  const { cvId } = useParams<{ cvId: string }>();
  const [deleteCvProject, { loading }] = useLazyRemoveCvProject();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //ПРОВЕРКА НА НАЛИЧИЕ ПРАВ

    try {
      const response = await deleteCvProject({
        variables: {
          project: {
            cvId: cvId || '',
            projectId: projectId || '',
          },
        },
      });

      if (!response.data) return;

      toast.success(`${t('common:successfully')}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });

      onClick();
    } catch (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  return (
    <Container>
      <Form>
        <FormHeader>
          <Typography variant="h5">{t('projects:removeCvProject')} </Typography>
          <ClearIcon
            onClick={onClick}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          />
        </FormHeader>

        <form onSubmit={onSubmit}>
          <FormBody>
            <Typography>{`${t('common:sure')} ${projectName} ${t('language')}?`}</Typography>

            <HorizontalStack>
              <Button variant="outlined" onClick={onClick}>
                {t('cancel')}
              </Button>
              <Button variant="contained" type="submit" loading={loading}>
                {t('common:confirm')}
              </Button>
            </HorizontalStack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default DeleteCvProject;
