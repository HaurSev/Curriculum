import authorisation from '../locales/en/authorisation.json';
import CVs from '../locales/en/CVs.json';
import departaments from '../locales/en/departments.json';
import languages from '../locales/en/languages.json';
import positions from '../locales/en/positions.json';
import projects from '../locales/en/projects.json';
import skills from '../locales/en/skills.json';
import users from '../locales/en/users.json';
import test from '../locales/en/test.json';

const resources = {
  authorisation,
  CVs,
  departaments,
  languages,
  positions,
  projects,
  skills,
  users,
  test,
} as const;

export default resources;
