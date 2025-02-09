import { sizes } from './sizes';

//Example theme based on Material Design 3
//https://m2.material.io/design/color/the-color-system.html#color-usage-and-palettes

export const lightTheme = {
  colors: {
    primary: 'rgb(76, 175, 80)', // Fine green
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(232, 245, 233)', // Light green container
    onPrimaryContainer: 'rgb(27, 94, 32)', // Dark green text
    secondary: 'rgb(96, 125, 139)', // Cool gray
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(236, 239, 241)', // Light cool gray
    onSecondaryContainer: 'rgb(38, 50, 56)', // Dark gray text
    tertiary: 'rgb(128, 128, 128)', // Neutral gray for minimalism
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(245, 245, 245)',
    onTertiaryContainer: 'rgb(66, 66, 66)',
    error: 'rgb(176, 0, 32)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 235, 238)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 255, 255)',
    onBackground: 'rgb(33, 33, 33)',
    surface: 'rgb(255, 255, 255)',
    onSurface: 'rgb(33, 33, 33)',
    surfaceVariant: 'rgb(245, 245, 245)',
    onSurfaceVariant: 'rgb(66, 66, 66)',
    outline: 'rgb(189, 189, 189)',
    outlineVariant: 'rgb(224, 224, 224)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(33, 33, 33)',
    inverseOnSurface: 'rgb(245, 245, 245)',
    inversePrimary: 'rgb(165, 214, 167)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(250, 250, 250)',
      level2: 'rgb(247, 247, 247)',
      level3: 'rgb(244, 244, 244)',
      level4: 'rgb(243, 243, 243)',
      level5: 'rgb(241, 241, 241)',
    },
    surfaceDisabled: 'rgba(33, 33, 33, 0.12)',
    onSurfaceDisabled: 'rgba(33, 33, 33, 0.38)',
    backdrop: 'rgba(0, 0, 0, 0.3)',
  },
  sizes,
} as const;

export const darkTheme = {
  colors: {
    primary: '#a5d6a7', // Light green for dark theme
    onPrimary: 'rgb(27, 94, 32)',
    primaryContainer: 'rgb(46, 125, 50)', // Darker green container
    onPrimaryContainer: 'rgb(232, 245, 233)',
    secondary: 'rgb(176, 190, 197)', // Light cool gray
    onSecondary: 'rgb(38, 50, 56)',
    secondaryContainer: 'rgb(69, 90, 100)',
    onSecondaryContainer: 'rgb(236, 239, 241)',
    tertiary: 'rgb(189, 189, 189)', // Light gray for minimalism
    onTertiary: 'rgb(66, 66, 66)',
    tertiaryContainer: 'rgb(97, 97, 97)',
    onTertiaryContainer: 'rgb(238, 238, 238)',
    error: 'rgb(255, 138, 128)',
    onError: 'rgb(65, 0, 2)',
    errorContainer: 'rgb(176, 0, 32)',
    onErrorContainer: 'rgb(255, 235, 238)',
    background: 'rgb(18, 18, 18)',
    onBackground: 'rgb(238, 238, 238)',
    surface: '#121212',
    onSurface: 'rgb(238, 238, 238)',
    surfaceVariant: 'rgb(30, 30, 30)',
    onSurfaceVariant: 'rgb(189, 189, 189)',
    outline: 'rgb(117, 117, 117)',
    outlineVariant: 'rgb(66, 66, 66)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(238, 238, 238)',
    inverseOnSurface: 'rgb(33, 33, 33)',
    inversePrimary: 'rgb(76, 175, 80)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(28, 28, 28)',
      level2: 'rgb(31, 31, 31)',
      level3: 'rgb(33, 33, 33)',
      level4: 'rgb(35, 35, 35)',
      level5: 'rgb(36, 36, 36)',
    },
    surfaceDisabled: 'rgba(238, 238, 238, 0.12)',
    onSurfaceDisabled: 'rgba(238, 238, 238, 0.38)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  sizes,
} as const;
