import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark : false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EAA454',

    '--ifm-color-primary': '#EAA454',
    '--ifm-color-primary-dark': '#EF8E22',
    '--ifm-color-primary-darker': '#E87900',
    '--ifm-color-primary-darkest': '#D49900',
    '--ifm-color-primary-light': '#FF9C00',
    '--ifm-color-primary-lighter': '#FFB443',
    '--ifm-color-primary-lightest': '#FFCE7E',

    accent: '#7af7ff',
    success: '5ccc68',
    warning: '#FFE600',
    error: '#CE674E',
    info: '#bbbdbf',
    primaryContrastText: '#fff',
  },
};

export default theme;
