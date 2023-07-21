/** @type {require('src').Config} */
module.exports = {
  content: ["./tests/**/*.html"],
  output: "./build",
  custom: {
    colors: {
      primary: "#ff0000",
      secondary: "#00ff00",
    },
    fonts: {
      family: {
        app: "'Khmer OS Battambang', serif, 'Roboto', sans-serif",
        battambang: "'Khmer OS Battambang', serif",
        roboto: "'Roboto', sans-serif",
      },
      size: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
      },
      weight: {
        light: 300,
        normal: 400,
      },
    },
  },
};
