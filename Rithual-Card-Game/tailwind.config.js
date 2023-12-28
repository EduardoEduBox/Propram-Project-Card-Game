/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "5/7": "5 / 7",
      },
      boxShadow: {
        card: "0 0 30px 0 rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
