const DISPLAY = {
  hidden: "display:none",
  block: "display:block",
  flex: {
    _default: "display:flex",
    row: "flex-direction:row",
    col: "flex-direction:column",
    wrap: "flex-wrap:wrap",
    nowrap: "flex-wrap:nowrap",
  },
  grid: {
    _default: "display:grid",
    row: "grid-template-rows:repeat(auto-fit, minmax(0, 1fr))",
    column: "grid-template-columns:repeat(auto-fit, minmax(0, 1fr))",
    wrap: "grid-auto-flow:dense",
    nowrap: "grid-auto-flow:nowrap",
  },
};

module.exports = {
  ...DISPLAY,
};
