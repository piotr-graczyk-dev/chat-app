import 'i18next';

import { defaultNS, resources } from '../localization/i18n';

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['pl'];
  }
}
