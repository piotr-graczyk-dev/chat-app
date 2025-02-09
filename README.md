# Chat app

An basic implementation of chat using Expo Server API.

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
    bun start
   ```

3. Run the app on a simulator

   ```bash
    bun ios # or bun android
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Tech Stack

| Library                          | Category                | Version | Description                                                     |
| -------------------------------- | ----------------------- | ------- | --------------------------------------------------------------- |
| React Native                     | Mobile Framework        | v0.76   | The best cross-platform mobile framework                        |
| React                            | UI Framework            | v18     | The most popular UI framework in the world                      |
| TypeScript                       | Language                | v5      | Static typechecking                                             |
| Expo Router                      | Navigation              | v4      | Performant and consistent navigation framework                  |
| React Native Unistyle            | Styles                  | v2      | Styles and theming library                                      |
| React Native Paper               | UI Library              | v5      | Material Design components                                      |
| Zustand                          | Client State Management | v4.5    | A small, fast and scalable bearbones state-management           |
| Tenstack Query                   | Server State Management | v5      | Powerful asynchronous state management                          |
| Expo                             | SDK                     | v52     | Allows (optional) Expo modules                                  |
| Expo Font                        | Custom Fonts            | v13     | Import custom fonts                                             |
| Expo Image                       | Image                   | v2      | Caching and fast image loading                                  |
| Expo EAS                         | Deployment              |         | Deployment tool                                                 |
| RN Reanimated                    | Animations              | v3      | Beautiful and performant animations                             |
| React Native MMKV                | Persistence             | v3      | State persistence                                               |
| Hermes                           | JS engine               |         | Fine-tuned JS engine for RN                                     |
| Jest                             | Test Runner             | v29     | Standard test runner for JS apps                                |
| Maestro                          | Testing Framework       |         | Automate end-to-end UI testing                                  |
| Day.js                           | Date library            | v1      | Excellent date library                                          |
| FlashList                        | FlatList replacement    | v1      | A performant drop-in replacement for FlatList                   |
| react-native-bottom-tabs         | Native Bottom Tabs      | v0.7      | Wrapper for native bottom tabs, opt-out if custom for project   |
| i18n                             | Localization package    | v24     | Internationalization framework with ready to use types and more |
| react-native-keyboard-controller | Keyboard library        | v1      | Great keyboard manager library                                  |

## Commits and PRs

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.

## Project structure

```
.
├── src
│   ├── api # Stores API related configs
│   ├── app # Screens
│   ├── assets # Assets (e.g. images, fonts)
│   ├── components
│   │   ├── common # Common components used in multiple screens
│   │   └── screens # Screen components used in single screen (based on routes)
│   ├── constants
│   │   ├── themes.ts # Themes
│   │   ├── sizes.ts # Sizes for margin and padding itd.
│   │   └── breakpoints.ts # Breakpoints for responsive design
│   ├── context # Contexts used in app
│   ├── hooks # Hooks used in app
│   ├── utils # Utils used in app (e.g. helpers, functions)
|   ├── localization # Stores apps localization
│   └── store # Stores used in app
|
```

## Localization

The project uses i18next for internationalization. Here's how to work with translations:

### 1. Create a New Namespace

Translations are organized in namespaces. Each feature typically has its own namespace.

1. Create a new JSON file in `src/localization/locales/[language]/[namespace].json`:

```json:src/localization/locales/en/myfeature.json
{
  "title": "My Feature",
  "description": "This is my new feature"
}
```

2. Export the namespace in `src/localization/locales/index.ts`:

```typescript:src/localization/locales/index.ts
import common from './en/common.json';
import imlookin from './en/imlookin.json';
import myfeature from './en/myfeature.json';

export const resources = {
  en: {
    common,
    imlookin,
    myfeature, // Add your new namespace here
  },
} as const;
```

### 2. Using Translations in Components

Use the `useTranslation` hook and specify the namespace(s) you want to use:

```typescript
import { useTranslation } from 'react-i18next';

export const MyComponent = () => {
  const { t } = useTranslation(['myfeature']); // Specify namespace(s)

  return (
    <Text>{t('title')}</Text>  // Uses 'title' from myfeature namespace
  );
};
```

### 3. Automatic Key Extraction

The project is configured to automatically extract translation keys from your code. To extract keys:

1. Use the extraction script:

```bash
bun extract:locales
```

This command (defined in package.json) will:

- Scan your code for translation keys
- Update your translation files with new keys
- Keep existing translations
- Add missing keys with empty values

The extraction is configured in `i18next-parser.config.js`.

### 4. Translation File Structure

```
src/localization/
├── locales/
│   ├── en/
│   │   ├── common.json    # Shared translations
│   │   ├── imlookin.json  # Feature-specific translations
│   │   └── myfeature.json # Your new translations
│   └── index.ts           # Resource exports
└── i18n.ts               # i18next configuration
```

### Best Practices

1. Use namespaces to organize translations by feature
2. Keep common/shared translations in the `common` namespace
3. Run `bun extract:locales` when adding new translation keys
4. Always provide translations for all supported languages
5. Use type-safe translations with the provided TypeScript setup
