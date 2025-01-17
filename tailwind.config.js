import fluid, { extract, screens, fontSize } from 'fluid-tailwind';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: {
    files: ["./src/**/*.{html,ejs,js,scss}"],
    extract,
  },
  theme: {
    screens,
    fontSize,
    // screens: {
    //   'sm': '640px',
    //   'md': '900px',
    //   'lg': '1024px'
    // },
    extend: {
      borderRadius: {
        '48px': '48px',
      },
      colors: {
        violet: '#6663ff',
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
        roslindale: ['Roslindale', 'serif'],
      },
      fontSize: {
        '2x-base': ['2rem',    { lineHeight: '3rem' }], 
        '2xs':     ['.563rem', { lineHeight: '1rem' }], 
        '4xl':     ['2.25rem', { lineHeight: '3.25rem' }],
        '5xl':     ['3rem',    { lineHeight: '4.5rem' }],
      },
      opacity: {
        '3': '.03',
      }
    },
  },
  plugins: [
    fluid,
    plugin(function ({ addBase }) {
      addBase({
        body: {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'text-rendering': 'optimizeSpeed',
        },
      });
    }),
  ],
};

export default config;
