export default {
  defaultNamespace: 'common',
  defaultValue: 'TODO: missing translation',
  output: 'src/localization/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{js,ts,jsx,tsx}'],
  sort: true,
  locales: ['en', 'pl'],
  i18nextOptions: {
    compatibilityJSON: 'v3',
  },
};
