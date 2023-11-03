import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { toast } from "./Toast";
import { globalDerivedState } from "./globalState";

function ColorPalette() {
  const colors = globalDerivedState.adaptDerivative("colors");

  const containerStyles = {
    display: "flex",
    border: "2px solid #B6B6B6",
    padding: "10px",
    borderRadius: "20px",
    marginBottom: "50px",
  };

  return () =>
    html`<div style=${styleMap(containerStyles)}>
      ${colors().map((color, i) => {
        const colorStyles = {
          backgroundColor: `${color}`,
          width: `calc(80vw / ${colors().length})`,
          height: "300px",
          borderTopLeftRadius: i === 0 ? "12px" : undefined,
          borderBottomLeftRadius: i === 0 ? "12px" : undefined,
          borderTopRightRadius: i === colors().length - 1 ? "12px" : undefined,
          borderBottomRightRadius:
            i === colors().length - 1 ? "12px" : undefined,
          cursor: "pointer",
        };

        return html`<div
          style=${styleMap(colorStyles)}
          @click=${async () => {
            try {
              await navigator.clipboard.writeText(color);
              toast({ info: "Color copied!", timeout: 5000 });
            } catch (error) {
              toast({
                variant: "destructive",
                info: "Unable to copy color!",
                timeout: 5000,
              });
            }
          }}
        ></div>`;
      })}
    </div>`;
}

export { ColorPalette };
