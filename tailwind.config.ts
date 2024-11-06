import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      // breakpoint to support any devices
      sm: '640px',
      md: '960px',
      lg: '1024px',
      xl: '1360px',
      '2xl': '1536px',
    },
    fontSize: {
      // fill this for typo add all typography here
      xxs: ['9px', { lineHeight: '1.rem', fontWeight: 100 }],
      xs: ['0.75rem', { lineHeight: '1.125rem', fontWeight: 100 }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },

    colors: {
      // extend the colors here
      white: '#fff',
      black: '#000',
      typo: {
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#EAECF0',
        300: '#D0D5DD',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#182230',
        900: '#101828',
        950: '#0C111D',
      },
      gray: {
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#EAECF0',
        300: '#D0D5DD',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#182230',
        900: '#101828',
      },
      teal: {
        50: '#F0FDF9',
        100: '#CCFBEF',
        200: '#99F6E0',
        300: '#5FE9D0',
        400: '#2ED3B7',
        500: '#15B79E',
        600: '#0E9384',
        700: '#107569',
        800: '#125D56',
        900: '#134E48',
      },
      orangedark: {
        50: '#FFF4ED',
        100: '#FFE6D5',
        200: '#FFD6AE',
        300: '#FCA670',
        400: '#FF692E',
        500: '#FF4405',
        600: '#E62E05',
        700: '#BC1B06',
        800: '#97180C',
        900: '#771A0D',
      },
      red: {
        50: '#FEF3F2',
        100: '#FEF0C7',
        200: '#FECDCA',
        300: '#FDA29B',
        400: '#FDB022',
        500: '#F04438',
        600: '#D92D20',
        700: '#B42318',
        800: '#93370D',
        900: '#7A2E0E',
      },
      primary: {
        50: '#F9F5FF',
        100: '#F4EBFF',
        200: '#E9D7FE',
        300: '#D6BBFB',
        400: '#B692F6',
        500: '#9E77ED',
        600: '#7F56D9',
        700: '#6941C6',
        800: '#53389E',
        900: '#42307D',
        DEFAULT: '#6941C6',
        foreground: '#ffffff',
      },
    },
  },
  plugins: [
    animate,
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF', // or DEFAULT
            foreground: '#0C111D',
            divider: '#EAECF0',
            focus: '#7F56D9',
            content1: '#FFFFFF',
            content2: '#FCFCFD',
            content3: '#F9FAFB',
            content4: '#F2F4F7',
            primary: {
              50: '#F9F5FF',
              100: '#F4EBFF',
              200: '#E9D7FE',
              300: '#D6BBFB',
              400: '#B692F6',
              500: '#9E77ED',
              600: '#7F56D9',
              700: '#6941C6',
              800: '#53389E',
              900: '#42307D',
              DEFAULT: '#6941C6',
              foreground: '#ffffff',
            },
            secondary: {
              50: '#F8F9FC',
              100: '#EAECF5',
              200: '#D5D9EB',
              300: '#B3B8DB',
              400: '#717BBC',
              500: '#4E5BA6',
              600: '#3E4784',
              700: '#363F72',
              800: '#293056',
              900: '#101323',
              DEFAULT: '#107569',
              foreground: '#ffffff',
            },
            success: {
              50: '#ECFDF3',
              100: '#DCFAE6',
              200: '#ABEFC6',
              300: '#75E0A7',
              400: '#47CD89',
              500: '#17B26A',
              600: '#079455',
              700: '#067647',
              800: '#085D3A',
              900: '#074D31',
              DEFAULT: '#75E0A7',
              foreground: '#ffffff',
            },
            warning: {
              50: '#FFFAEB',
              100: '#FEF0C7',
              200: '#FEDF89',
              300: '#FEC84B',
              400: '#FDB022',
              500: '#F79009',
              600: '#DC6803',
              700: '#B54708',
              800: '#93370D',
              900: '#7A2E0E',
              DEFAULT: '#B54708',
              foreground: '#0C111D',
            },
            danger: {
              50: '#FEF3F2',
              100: '#FEE4E2',
              200: '#FECDCA',
              300: '#FDA29B',
              400: '#F97066',
              500: '#F04438',
              600: '#D92D20',
              700: '#B42318',
              800: '#912018',
              900: '#7A271A',
              DEFAULT: '#B42318',
              foreground: '#ffffff',
            },
          },
          layout: {
            dividerWeight: '1px', // h-divider the default height applied to the divider component
            disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
            // fontSize: {
            //   tiny: "0.75rem", // text-tiny
            //   small: "0.875rem", // text-small
            //   medium: "1rem", // text-medium
            //   large: "1.125rem", // text-large
            // },
            lineHeight: {
              tiny: '1rem', // text-tiny
              small: '1.25rem', // text-small
              medium: '1.5rem', // text-medium
              large: '1.75rem', // text-large
            },
            radius: {
              small: '8px', // rounded-small
              medium: '12px', // rounded-medium
              large: '14px', // rounded-large
            },
            borderWidth: {
              small: '1px', // border-small
              medium: '2px', // border-medium (default)
              large: '3px', // border-large
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

export default config;
