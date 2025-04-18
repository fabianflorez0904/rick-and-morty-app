// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.js'], // Ajustá según tu estructura
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        dark: 'var(--dark-bg)',
        medium: 'var(--medium-bg)',
        light: 'var(--light-bg)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        danger: 'var(--danger)',
      }
    }
  },
  plugins: [],
}