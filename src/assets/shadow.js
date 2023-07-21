const SHADOW = {
  shadow: {
    sm: "box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "box-shadow:0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    "3xl": "box-shadow:0 35px 60px -15px rgba(0, 0, 0, 0.3)",
    inner: "box-shadow:inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "box-shadow:0 0 0 3px rgba(66, 153, 225, 0.5)",
    none: "box-shadow:none",
  },
};
module.exports = {
  ...SHADOW,
};
