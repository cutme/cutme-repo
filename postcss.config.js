// module.exports = {
//   plugins: [
//     require('autoprefixer'),
//     require('cssnano')({
//         zindex: false
//     })
//   ]
// };

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      zindex: false
    }
  },
}