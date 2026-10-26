/* Prism SVG Optimizer · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const EDITOR_NS = ["inkscape", "sodipodi", "sketch", "figma", "serif", "illustrator", "i", "x", "graph", "a", "dc", "cc", "rdf"];
  const DEFAULTS = { "fill-opacity": "1", "stroke-opacity": "1", opacity: "1", "stroke-width": "1", "fill-rule": "nonzero", "stroke-linecap": "butt", "stroke-linejoin": "miter", "stroke-miterlimit": "4", "stroke-dasharray": "none", "stroke-dashoffset": "0", visibility: "visible", display: "inline", version: null, "xml:space": null, "enable-background": null };
  function roundNums(str, p) {
    return str.replace(/-?\d*\.\d+(?:e[-+]?\d+)?|-?\d+(?:e[-+]?\d+)?/gi, (n) => { const v = +parseFloat(n).toFixed(p); return String(v).replace(/^(-?)0\./, "$1."); });
  }
  function compactPath(d, p) {
    return roundNums(d, p).replace(/\s*([MmZzLlHhVvCcSsQqTtAa])\s*/g, "$1").replace(/,/g, " ").replace(/\s+/g, " ").replace(/ -/g, "-").replace(/(\.\d+) (?=\.)/g, "$1").trim();
  }
  function optimize(svg, o = {}) {
    const opt = { precision: 2, removeDimensions: false, removeComments: true, removeMetadata: true, removeEditorData: true, removeDefaults: true, collapseGroups: true, minifyStyles: true, removeTitle: false, ...o };
    let s = svg.trim();
    if (!/<svg[\s>]/i.test(s)) throw new Error("This does not look like an SVG (no <svg> tag found)");
    s = s.replace(/<\?xml[\s\S]*?\?>/g, "").replace(/<!DOCTYPE[\s\S]*?>/gi, "");
    if (opt.removeComments) s = s.replace(/<!--[\s\S]*?-->/g, "");
    if (opt.removeMetadata) s = s.replace(/<metadata[\s\S]*?<\/metadata>/gi, "").replace(/<desc>[\s\S]*?<\/desc>/gi, "");
    if (opt.removeTitle) s = s.replace(/<title>[\s\S]*?<\/title>/gi, "");
    if (opt.removeEditorData) {
      const ns = EDITOR_NS.join("|");
      s = s.replace(new RegExp(`<(${ns}):[\\w-]+[^>]*\\/>`, "g"), "").replace(new RegExp(`<(${ns}):([\\w-]+)[^>]*>[\\s\\S]*?<\\/\\1:\\2>`, "g"), "");
      s = s.replace(new RegExp(`\\s(xmlns:(${ns})|(${ns}):[\\w-]+)="[^"]*"`, "g"), "");
      s = s.replace(/\s(data-name|id)="(Layer_\d+|Calque_\d+|layer\d+|Group_\d+|Path_\d+|path\d+|g\d+|svg\d+|defs\d+)"/g, "");
    }
    s = s.replace(/\s(d|points)="([^"]*)"/g, (m, a, v) => ` ${a}="${a === "d" ? compactPath(v, opt.precision) : roundNums(v, opt.precision).replace(/\s*,\s*/g, ",").replace(/\s+/g, " ").trim()}"`);
    s = s.replace(/\s(x|y|x1|x2|y1|y2|cx|cy|r|rx|ry|width|height|stroke-width|offset|opacity|fill-opacity|stroke-opacity)="(-?[\d.]+(?:e-?\d+)?)(px)?"/g, (m, a, v) => ` ${a}="${roundNums(v, opt.precision)}"`);
    s = s.replace(/\stransform="([^"]*)"/g, (m, v) => ` transform="${roundNums(v, opt.precision).replace(/\s*,\s*/g, " ").replace(/\s+/g, " ").trim()}"`);
    if (opt.removeDefaults) s = s.replace(/\s([\w:-]+)="([^"]*)"/g, (m, a, v) => (a in DEFAULTS && (DEFAULTS[a] === null || DEFAULTS[a] === v) ? "" : m));
    s = s.replace(/\s[\w:-]+=""/g, "");
    if (opt.minifyStyles) s = s.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (m, a, css) => `<style${a}>${css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").trim()}</style>`);
    if (opt.removeDimensions) {
      s = s.replace(/<svg\b([^>]*)>/i, (m, attrs) => {
        let a = attrs; const w = /\swidth="([\d.]+)"/.exec(a), h = /\sheight="([\d.]+)"/.exec(a);
        if (!/viewBox=/.test(a) && w && h) a += ` viewBox="0 0 ${w[1]} ${h[1]}"`;
        return `<svg${a.replace(/\s(width|height)="[^"]*"/g, "")}>`;
      });
    }
    s = s.replace(/<defs>\s*<\/defs>|<defs\/>|<g>\s*<\/g>|<g\/>/g, "");
    if (opt.collapseGroups) { let prev; do { prev = s; s = s.replace(/<g>((?:(?!<g[\s>])[\s\S])*?)<\/g>/g, "$1"); } while (s !== prev); }
    s = s.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").replace(/\s+(\/?>)/g, "$1").trim();
    return s;
  }
  const bytes = (s) => new TextEncoder().encode(s).length;
  function stats(before, after) { const a = bytes(before), b = bytes(after); return { before: a, after: b, saved: a - b, percent: a ? Math.round(((a - b) / a) * 1000) / 10 : 0 }; }
  function dataUri(svg) {
    const enc = svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
    return `data:image/svg+xml,${enc}`;
  }
  function toJSX(svg, name = "Icon") {
    const camel = (a) => (a === "class" ? "className" : a.startsWith("data-") || a.startsWith("aria-") ? a : a.replace(/[:-]([a-z])/g, (_, c) => c.toUpperCase()));
    let jsx = svg.replace(/\s([\w:-]+)=/g, (m, a) => ` ${camel(a)}=`).replace(/\sstyle="([^"]*)"/g, (m, css) => ` style={{${css.split(";").filter(Boolean).map((d) => { const [k, ...v] = d.split(":"); return `${camel(k.trim())}: ${JSON.stringify(v.join(":").trim())}`; }).join(", ")}}}`);
    jsx = jsx.replace(/<svg\b/, "<svg {...props}");
    return `export default function ${name}(props) {\n  return (\n    ${jsx}\n  );\n}\n`;
  }
  return { optimize, stats, dataUri, toJSX, bytes, compactPath };
});
