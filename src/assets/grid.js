const GRID = {
  grid: {
    _default: "display:grid",
    row: {
      _default: "grid-auto-flow:row",
      reverse: "grid-auto-flow:row-reverse",
      2: "grid-template-rows:repeat(2, minmax(0, 1fr))",
      3: "grid-template-rows:repeat(3, minmax(0, 1fr))",
      4: "grid-template-rows:repeat(4, minmax(0, 1fr))",
      5: "grid-template-rows:repeat(5, minmax(0, 1fr))",
      _custom: "grid-template-rows:",
    },
    col: {
      _default: "grid-auto-flow:column",
      reverse: "grid-auto-flow:column-reverse",
      2: "grid-template-columns:repeat(2, minmax(0, 1fr))",
      3: "grid-template-columns:repeat(3, minmax(0, 1fr))",
      4: "grid-template-columns:repeat(4, minmax(0, 1fr))",
      5: "grid-template-columns:repeat(5, minmax(0, 1fr))",
    },
    wrap: "grid-auto-flow:dense",
    nowrap: "grid-auto-flow:nowrap",
  },
};

module.exports = {
  ...GRID,
};
