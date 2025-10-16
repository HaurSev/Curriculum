import authorisation from '../../public/locales/en/authorisation.json';
import CVs from '../../public/locales/en/CVs.json';
import departments from '../../public/locales/en/departments.json';
import languages from '../../public/locales/en/languages.json';
import positions from '../../public/locales/en/positions.json';
import projects from '../../public/locales/en/projects.json';
import skills from '../../public/locales/en/skills.json';
import users from '../../public/locales/en/users.json';
import common from '../../public/locales/en/common.json';
import test from '../../public/locales/en/test.json';

const resources = {
  test,
  common,
  authorisation,
  CVs,
  departments,
  languages,
  positions,
  projects,
  skills,
  users,
} as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources;
  }
}
