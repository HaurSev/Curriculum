import { NS } from '../i18n';
import resources from '../public/@types/resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    NS: typeof NS;
    resources: typeof resources;
  }
}
