import authorisation from '../locales/en-US/authorisation.json';
import CVs from '../locales/en-US/CVs.json';
import departaments from '../locales/en-US/departments.json';
import languages from '../locales/en-US/languages.json';
import positions from '../locales/en-US/positions.json';
import projects from '../locales/en-US/projects.json';
import skills from '../locales/en-US/skills.json';
import users from '../locales/en-US/users.json';
import common from '../../public/locales/en-US/common.json';
import test from '../../public/locales/en-US/test.json';

const resources = {
  test,
  common,
  authorisation,
  CVs,
  departaments,
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
