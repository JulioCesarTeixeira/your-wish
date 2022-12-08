/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
