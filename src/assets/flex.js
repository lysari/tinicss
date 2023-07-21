const FLEX = {
  flex: {
    _default: "display:flex",
    row: {
      _default: "flex-direction:row",
      reverse: "flex-direction:row-reverse",
    },
    col: {
      _default: "flex-direction:column",
      reverse: "flex-direction:column-reverse",
    },
    wrap: "flex-wrap:wrap",
    nowrap: "flex-wrap:nowrap",
    auto: "flex:1 1 auto",
    grow: "flex-grow:1",
    shrink: "flex-shrink:1",
    none: "flex:none",
    initial: "flex:initial",
    inherit: "flex:inherit",
  },
};
module.exports = {
  ...FLEX,
};
