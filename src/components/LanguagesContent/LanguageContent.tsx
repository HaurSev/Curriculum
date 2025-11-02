import { Box, styled, Typography } from '@mui/material';
import type { LanguageProficiency } from 'cv-graphql';
import React from 'react';
import theme from '../../theme/theme';

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '80%',
  justifyContent: 'flex-start',
  padding: theme.spacing(5),
  gap: '25%',
}));

const Block = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(5),
}));

interface LanguageContentProps {
  languages: LanguageProficiency[];
}

const LanguageContent: React.FC<LanguageContentProps> = ({ languages }) => {
  return (
    <Container>
      {languages.map((lang) => (
        <Block>
          <Typography variant="h6">{lang.proficiency}</Typography>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.disabled,
            }}
          >
            {lang.name}
          </Typography>
        </Block>
      ))}
    </Container>
  );
};

export default LanguageContent;
