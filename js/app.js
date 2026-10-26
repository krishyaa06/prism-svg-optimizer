(() => {
  const { $, $$, copy, download, store, debounce, tabs, toast } = Prism;
  let out = "svg", result = "";
  const SAMPLE = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" width="256px" height="256px" viewBox="0 0 256 256" version="1.1" id="svg8" inkscape:version="1.2">
  <metadata id="metadata5"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format></cc:Work></rdf:RDF></metadata>
  <sodipodi:namedview id="base" pagecolor="#ffffff" inkscape:zoom="1.4" />
  <defs id="defs2">
    <linearGradient id="g" x1="0.000000" y1="0.000000" x2="1.000000" y2="1.000000"><stop offset="0.000000" stop-color="#00d2ff"/><stop offset="1.000000" stop-color="#6c63ff"/></linearGradient>
  </defs>
  <g id="layer1" inkscape:label="Layer 1" inkscape:groupmode="layer">
    <g>
      <rect x="16.000000" y="16.000000" width="224.000000" height="224.000000" rx="56.000000" fill="#0b0e1a" fill-opacity="1" stroke="url(#g)" stroke-width="8.000000" stroke-linecap="butt" />
      <path d="M 128.000000,44.000000 L 212.000000,128.000000 L 128.000000,212.000000 L 44.000000,128.000000 Z" fill="none" stroke="url(#g)" stroke-width="10.000000" stroke-opacity="1" />
      <circle cx="128.000000" cy="128.000000" r="22.500000" fill="url(#g)" opacity="1" />
    </g>
  </g>
</svg>`;
  const opts = () => ({ precision: +$("#precision").value, ...Object.fromEntries($$("[data-o]").map((c) => [c.dataset.o, c.checked])) });
  const safe = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/\son\w+="[^"]*"/gi, "");
  function render() {
    const src = $("#in").value; store.set("svg:in", src);
    if (!src.trim()) { $("#p1").innerHTML = $("#p2").innerHTML = ""; $("#res").textContent = "Paste an SVG to optimize it."; ["#b1", "#b2", "#pct"].forEach((i) => ($(i).textContent = "")); result = ""; return; }
    try { result = Core.optimize(src, opts()); } catch (e) { $("#res").textContent = e.message; result = ""; return; }
    const s = Core.stats(src, result);
    $("#b1").textContent = `${(s.before / 1024).toFixed(2)} KB`; $("#b2").textContent = `${(s.after / 1024).toFixed(2)} KB`; $("#pct").textContent = `−${s.percent}%`;
    $("#p1").innerHTML = safe(src); $("#p2").innerHTML = safe(result);
    $("#res").textContent = value();
  }
  const value = () => out === "uri" ? Core.dataUri(result) : out === "css" ? `background-image: url("${Core.dataUri(result)}");` : out === "jsx" ? Core.toJSX(result) : result;
  $("#in").addEventListener("input", debounce(render, 200));
  $("#precision").onchange = render; $$("[data-o]").forEach((c) => (c.onchange = render));
  tabs($("#out"), (v) => { out = v; render(); });
  $("#sample").onclick = () => { $("#in").value = SAMPLE; render(); };
  $("#file").onchange = async (e) => { const f = e.target.files[0]; if (f) { $("#in").value = await f.text(); render(); toast(`Loaded ${f.name}`); } };
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", async (e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { $("#in").value = await f.text(); render(); } });
  $("#copy").onclick = () => (result ? copy(value()) : toast("Nothing to copy"));
  $("#dl").onclick = () => result && download("optimized.svg", result, "image/svg+xml");
  $("#in").value = store.get("svg:in", SAMPLE); render();
})();
