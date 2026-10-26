<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:3EE69A,100:00D2FF&height=200&section=header&text=Prism%20SVG%20Optimizer&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Shrink%20%C2%B7%20Preview%20%C2%B7%20Export%20as%20JSX&descAlignY=58&descSize=16" width="100%" alt="Prism SVG Optimizer" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=3EE69A&center=true&vCenter=true&width=680&lines=Inkscape+junk+%E2%86%92+gone;%E2%88%9260%25+bytes%2C+same+picture;Export+as+a+React+component;Data+URI+for+CSS+backgrounds" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-svg-optimizer/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-svg-optimizer/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-svg-optimizer/"><img src="https://img.shields.io/badge/Live_Demo-Open-3EE69A?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-3EE69A?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-svg-optimizer?style=for-the-badge&color=00D2FF" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism SVG Optimizer screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="" />

## ⚡ Overview

**Prism SVG Optimizer** makes SVG files smaller without changing how they look. It removes XML declarations, comments, metadata and editor namespaces from Inkscape, Illustrator, Sketch and Figma, drops default attributes, rounds numbers to your chosen precision, compacts path data and flattens empty groups. Before/after previews let you confirm nothing broke, and the result can be exported as raw SVG, a data URI, a CSS background or a React component.

## ✨ Features

- **Removes** XML/doctype, comments, `<metadata>`, editor namespaces and auto-generated ids
- **Rounds** coordinates (precision 0–3) and **compacts** `d` / `points` data
- **Drops default attributes** and empty groups / defs
- **Responsive mode**: swaps width/height for a viewBox
- **Before/after preview** on a transparency checkerboard, size savings in %
- **Export** as SVG, data URI, CSS `background-image` or **React JSX** component

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism SVG Optimizer on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism SVG Optimizer on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-svg-optimizer/](https://krishyaa06.github.io/prism-svg-optimizer/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-svg-optimizer.git
cd prism-svg-optimizer
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Paste SVG markup, open a file, or drop one onto the page.
2. Tune precision and toggles; compare the two previews.
3. Pick **SVG / Data URI / CSS / React** and copy or download.

## 📁 Project Structure

```text
prism-svg-optimizer/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # UI wiring
│   ├── core.js   # optimizer + exporters — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism SVG Optimizer is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" alt="Soumya Bhandare" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00D2FF,50:3EE69A,100:07060f&height=110&section=footer" width="100%" alt="" />
