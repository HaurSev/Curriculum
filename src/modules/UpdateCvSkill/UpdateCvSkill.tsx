import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import theme from '../../theme/theme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useLazyUpdateCvSkill } from '../../graphql/mutations/updateCvSkill';
import { Container, Form, FormBody, FormHeader } from './style';
import {
  masteryKeys,
  UpdateSkillSchema,
  type UpdateSkillData,
  type UpdateSkillProps,
} from './type';
import { CloseIcon } from '../AddLanguages/style';

const UpdateCvSkill: React.FC<UpdateSkillProps> = ({ onClick, userSkill }) => {
  const [t] = useTranslation(['skills', 'common']);
  const { cvId } = useParams<{ cvId: string }>();

  const { handleSubmit, register } = useForm<UpdateSkillData>({
    resolver: zodResolver(UpdateSkillSchema),
    defaultValues: {
      cvId: cvId || '',
      name: userSkill.name,
      mastery: userSkill.mastery,
    },
  });

  const [updateCvSkill] = useLazyUpdateCvSkill();

  const onSubmit = async (data: UpdateSkillData) => {
    try {
      const response = await updateCvSkill({
        variables: {
          skill: {
            name: userSkill?.name || '',
            categoryId: userSkill?.categoryId || '',
            mastery: data.mastery,
            cvId: cvId || '',
          },
        },
      });

      if (!response.data) return;

      toast.success('Skill updated successfully!', {
        position: 'top-center',
        autoClose: 3000,
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

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container>
      <Form onClick={handleFormClick}>
        <FormHeader>
          <Typography variant="h4">{t('skills:updateSkill')}</Typography>
          <CloseIcon onClick={handleCloseClick} />
        </FormHeader>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <FormBody>
            <TextField
              select
              fullWidth
              label={t('skill')}
              defaultValue={userSkill.name}
              disabled
            >
              <MenuItem value={userSkill.name}>{userSkill.name}</MenuItem>
            </TextField>

            <TextField
              {...register('mastery')}
              placeholder={t('skillMastery')}
              select
              label={t('skillMastery')}
              fullWidth
              defaultValue={userSkill.mastery}
            >
              {masteryKeys.map((k) => (
                <MenuItem key={k} value={k}>
                  {k}
                </MenuItem>
              ))}
            </TextField>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: theme.spacing(5),
              }}
            >
              <Button variant="outlined" onClick={handleCloseClick}>
                {t('common:cancel')}
              </Button>
              <Button type={'submit'} variant="contained">
                {t('common:update')}
              </Button>
            </Stack>
          </FormBody>
        </form>
      </Form>
    </Container>
  );
};

export default UpdateCvSkill;
