/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/dist/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
