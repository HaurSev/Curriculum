import {
  Avatar,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import theme from '../../theme/theme';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Bounce, toast } from 'react-toastify';
import { useLazyUploadAvatar } from '../../graphql/mutations/uploadAvatar';
import { AvatarContainer, HiddenInput, UploadBlock } from './style';
import type { ProfileAvatarProps } from './type';

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  first_name,
  avatar,
  userId,
  onUpdate,
}) => {
  const [t] = useTranslation(['users', 'common']);

  const userJson = sessionStorage.getItem('user') || '';
  const user = JSON.parse(userJson);

  const [uploadAvatar, { loading }] = useLazyUploadAvatar();

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        const response = await uploadAvatar({
          variables: {
            avatar: {
              userId: user.id,
              base64,
              size: file.size,
              type: file.type,
            },
          },
        });

        if (response?.data) {
          onUpdate();

          toast.success(t('common:successfully'), {
            position: 'top-center',
            autoClose: 3000,
            theme: 'dark',
            transition: Bounce,
          });
        }
      } catch (error: unknown) {
        let message = 'Unknown error';

        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === 'string') {
          message = error;
        }

        toast.error(message, {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
          transition: Bounce,
        });
      }
    };

    reader.readAsDataURL(file);
  };

  if (loading) return <CircularProgress />;

  return (
    <AvatarContainer>
      {avatar ? (
        <Avatar src={avatar} />
      ) : first_name ? (
        <Avatar>{first_name?.[0]}</Avatar>
      ) : (
        <Avatar />
      )}

      {userId === user.id && (
        <UploadBlock>
          <Typography variant="h5" textTransform={'capitalize'}>
            <label htmlFor="avatar-upload">
              <HiddenInput
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={onChange}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  marginRight: theme.spacing(2),
                }}
              >
                <FileUploadIcon />
              </IconButton>
              {t('uploadAvatarImg')}
            </label>
          </Typography>
          <Typography variant="body1" color={theme.palette.text.disabled}>
            {t('uploadRules')}
          </Typography>
        </UploadBlock>
      )}
    </AvatarContainer>
  );
};

export default ProfileAvatar;
