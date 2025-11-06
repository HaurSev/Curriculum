import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../../theme/theme';
import { useForm } from 'react-hook-form';
import { type SkillMastery } from 'cv-graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bounce, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useLazyUpdateProfileSkill } from '../../graphql/mutations/updateProfileSkill';
import { Container, Form, FormBody, FormHeader } from './UpdateProfileSkill';

interface UpdateSkillProps {
  onClick: () => void;
  userSkill: SkillMastery;
}

interface UpdateSkillData {
  userId: string;
  name: string;
  mastery: 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';
}

const UpdateSkillSchema = z.object({
  userId: z.string(),
  name: z.string().nonempty(),
  mastery: z.enum(['Novice', 'Advanced', 'Competent', 'Proficient', 'Expert']),
});

const UpdateSkill: React.FC<UpdateSkillProps> = ({ onClick, userSkill }) => {
  const [t] = useTranslation(['skills', 'common']);
  const { userId } = useParams<{ userId: string }>();

  const masteryKeys = [
    'Novice',
    'Advanced',
    'Competent',
    'Proficient',
    'Expert',
  ];

  const { handleSubmit, register } = useForm<UpdateSkillData>({
    resolver: zodResolver(UpdateSkillSchema),
    defaultValues: {
      userId: userId || '',
      name: userSkill.name,
      mastery: userSkill.mastery,
    },
  });

  const [updateProfileSkill] = useLazyUpdateProfileSkill();

  const onSubmit = async (data: UpdateSkillData) => {
    if (data.mastery === userSkill.mastery) {
      toast.error(t('notChange'), {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await updateProfileSkill({
        variables: {
          skill: {
            userId: userId || '',
            name: userSkill?.name || '',
            categoryId: userSkill?.categoryId || '',
            mastery: data.mastery,
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
          <ClearIcon onClick={handleCloseClick} sx={{ cursor: 'pointer' }} />
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

export default UpdateSkill;
