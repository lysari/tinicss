//this file not auto register
const SAMPLE = {
  sample: {
    _default: "sample:default", // sample => sample:default
    xyz: "sample:xyz", // sample-xyz => sample:xyz
    a: {
      b: "sample:ab", // sample-a-b => sample:ab
    },
    _custom: "sample:", // sample-[custom] => sample:custom
  },
};

module.exports = {
  ...SAMPLE,
};
