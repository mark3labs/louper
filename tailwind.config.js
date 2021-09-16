module.exports = {
  purge: {
    content: ['./src/**/*.svelte'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      nunito: ['nunito', 'sans-serif'],
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
