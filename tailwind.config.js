import fluid, { extract, screens, fontSize } from 'fluid-tailwind'
 
const config: Config = {
  content: {
    files: ["./src/**/*.{html,ejs,js,scss}"],
    extract
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
      fontFamily: {
        //apercu: ['ApercuPro', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif'],
        roslindale: ['Roslindale', 'serif'],
      },
      fontSize: {
        '2x-base': '2rem', 
        '2xs': '.563rem', 
        '4xl': ['2.25rem', { lineHeight: '3.25rem' }],
        '5xl': ['3rem', { lineHeight: '2.5' }],
      },
      opacity: {
        '3': '.03',
      }
    },
  },
  plugins: [fluid]
}
export default config;
