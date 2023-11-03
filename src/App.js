import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { ColorPalette } from "./ColorPalette";
import { h } from "promethium-js";
import Controls from "./Controls";
import { Toaster } from "./Toast";

function App() {
  const containerStyles = {
    marginTop: "30px",
    marginBottom: "30px",
    height: "max-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const h1Styles = {
    fontFamily: "sans-serif",
    fontWeight: "800",
    fontSize: "26px",
    marginBottom: "10px",
  };

  const h2Styles = {
    fontFamily: "sans-serif",
    fontWeight: "normal",
    fontSize: "20px",
    color: "#7D7C83",
    marginBottom: "50px",
  };

  return () => html`
    <div style=${styleMap(containerStyles)}>
      <h1 style=${styleMap(h1Styles)}>Color Palette Generator</h1>
      <h2 style=${styleMap(h2Styles)}>
        Create a gradient palette between two colors
      </h2>
      ${h(ColorPalette)} ${h(Controls)} ${h(Toaster)}
    </div>
  `;
}

export default App;
