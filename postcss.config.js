const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const plugins =
  process.env.NODE_ENV === 'production'
    ? [tailwind, autoprefixer]
    : [tailwind, autoprefixer]

module.exports = { plugins }
