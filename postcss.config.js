export default {
  plugins: {
    tailwindcss: {
      mode: 'jit',
      purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    },
    autoprefixer: {},
  },
}
