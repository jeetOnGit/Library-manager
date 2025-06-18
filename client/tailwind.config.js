// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        bgprimary: 'var(--bg-primary)',
        txtprimary: 'var(--text-primary)',
        txtsecondary: 'var(--text-secondary)',
      },
    },
  },
  plugins: [],
}
