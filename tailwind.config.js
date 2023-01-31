/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
  theme: {
    extend: {
      gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
    },
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
