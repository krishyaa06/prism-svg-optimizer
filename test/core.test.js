const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
const SVG = `<?xml version="1.0"?>\n<!-- hi -->\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="x" inkscape:version="1" width="24" height="24" version="1.1">\n  <metadata>junk</metadata>\n  <g>\n    <path d="M 10.123456,20.987654 L 30.5000, 40.0000 Z" fill-opacity="1" stroke-width="1" />\n  </g>\n  <g></g>\n</svg>`;

test("removes junk and shrinks", () => {
  const o = C.optimize(SVG);
  assert.ok(!/<\?xml|<!--|metadata|inkscape|version=|fill-opacity|stroke-width/.test(o), o);
  assert.ok(C.stats(SVG, o).percent > 40);
  assert.equal(o, '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.12 20.99L30.5 40Z"/></svg>');
});
test("precision control", () => {
  assert.equal(C.compactPath("M 1.23456 2.5 L -0.5 0.25", 1), "M1.2 2.5L-.5.3");
});
test("responsive mode adds viewBox", () => {
  const o = C.optimize('<svg width="10" height="20"><rect/></svg>', { removeDimensions: true });
  assert.equal(o, '<svg viewBox="0 0 10 20"><rect/></svg>');
});
test("rejects non-SVG", () => {
  assert.throws(() => C.optimize("<div></div>"));
});
test("data URI and JSX", () => {
  assert.match(C.dataUri('<svg fill="#fff"/>'), /^data:image\/svg\+xml,%3Csvg fill='%23fff'\/%3E$/);
  const jsx = C.toJSX('<svg class="a" stroke-width="2" xlink:href="x"/>');
  assert.match(jsx, /className="a"/); assert.match(jsx, /strokeWidth="2"/); assert.match(jsx, /\{\.\.\.props\}/);
});
