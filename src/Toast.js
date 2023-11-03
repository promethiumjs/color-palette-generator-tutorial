import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { adaptState } from "promethium-js";

const [toastQueue, setToastQueue] = adaptState([]);

function Toaster() {
  const toastHeight = 50;
  const toastOffset = 20;

  return () =>
    html`${toastQueue().map(({ variant, info }, i) => {
      const toastStyles = {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: `${(toastHeight + 10) * i + toastOffset}px`,
        height: `${toastHeight}px`,
        right: `${toastOffset}px`,
        borderRadius: "10px",
        padding: "0px 20px",
        fontFamily: "sans-serif",
        color: "white",
        backgroundColor: variant === "destructive" ? "#E42F2F" : "#2F73CA",
      };

      return html`<div style=${styleMap(toastStyles)}>${info}</div>`;
    })}`;
}

function toast({ variant, info, timeout }) {
  const id = Math.random();
  setToastQueue((toastQueue) => [...toastQueue, { variant, info, id }]);
  setTimeout(() => {
    setToastQueue((toastQueue) =>
      toastQueue.filter(({ id: _id }) => _id !== id),
    );
  }, timeout);
}

export { Toaster, toast };
