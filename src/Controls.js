import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { toast } from "./Toast";
import { live } from "lit/directives/live.js";
import { globalState, globalDerivedState } from "./globalState";

function Controls() {
  const [controlsData, setControlsData] =
    globalState.adaptParticle("controlsData");
  const colors = globalDerivedState.adaptDerivative("colors");

  const containerStyles = {
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    gap: "20px",
    border: "2px solid #B6B6B6",
    borderRadius: "10px",
    padding: "30px",
  };

  const labelStyles = {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 20px 0 20px",
    gap: "10px",
  };

  const colorInputStyles = {
    border: "2px solid black",
    borderRadius: "5px",
    width: "30px",
    height: "30px",
    cursor: "pointer",
  };

  const numberInputStyles = {
    border: "2px solid black",
    borderRadius: "5px",
    width: "60px",
    height: "30px",
    padding: "0 5px 0 15px",
  };

  const buttonStyles = {
    border: "2px solid black",
    borderRadius: "5px",
    height: "35px",
    margin: "0 20px 0 20px",
    padding: "5px 15px 5px 15px",
    fontWeight: "bold",
    backgroundColor: "white",
    cursor: "pointer",
  };

  function handleInput(field, value) {
    setControlsData((controlsData) => ({
      ...controlsData,
      [field]: value,
    }));
  }

  function invalidNumberToast() {
    toast({
      variant: "destructive",
      info: `Please input valid number from ${
        controlsData().minNumberOfColors
      } - ${controlsData().maxNumberOfColors}!`,
      timeout: 5000,
    });
  }

  function transformNumberInput(e) {
    let transformedNumberInput;
    let inputMaxNumber = Number(e.target.max);
    let inputMinNumber = Number(e.target.min);
    let inputValueNumber = Number(e.target.value);

    if (Number.isNaN(e.target.value)) {
      invalidNumberToast();
      transformedNumberInput = 2;
    } else if (inputValueNumber > inputMaxNumber) {
      invalidNumberToast();
      transformedNumberInput = inputMaxNumber;
    } else if (inputValueNumber < inputMinNumber) {
      invalidNumberToast();
      transformedNumberInput = inputMinNumber;
    } else {
      transformedNumberInput = inputValueNumber;
    }

    return transformedNumberInput;
  }

  return () =>
    html`<div style=${styleMap(containerStyles)}>
      <label style=${styleMap(labelStyles)}
        >Start Color
        <span
          style=${styleMap({
            ...colorInputStyles,
            backgroundColor: controlsData().startColor,
          })}
        >
          <input
            type="color"
            .value=${controlsData().startColor}
            @input=${(e) => handleInput("startColor", e.target.value)}
            style="visibility: hidden"
          />
        </span>
      </label>
      <label style=${styleMap(labelStyles)}>
        End Color
        <span
          style=${styleMap({
            ...colorInputStyles,
            backgroundColor: controlsData().endColor,
          })}
        >
          <input
            type="color"
            .value=${controlsData().endColor}
            @input=${(e) => handleInput("endColor", e.target.value)}
            style="visibility: hidden"
          />
        </span>
      </label>
      <label style=${styleMap(labelStyles)}
        >Number of Colors
        <input
          type="number"
          .value=${live(controlsData().numberOfColors)}
          @change=${(e) =>
            handleInput("numberOfColors", transformNumberInput(e))}
          min=${controlsData().minNumberOfColors}
          max=${controlsData().maxNumberOfColors}
          style=${styleMap(numberInputStyles)}
        />
      </label>
      <button
        style=${styleMap(buttonStyles)}
        @click=${() =>
          handleInput(
            "numberOfColors",
            Math.ceil(
              Math.max(
                controlsData().minNumberOfColors,
                Math.random() * controlsData().maxNumberOfColors,
              ),
            ),
          )}
      >
        Random
      </button>
      <button
        style=${styleMap(buttonStyles)}
        @click=${async () => {
          try {
            await navigator.clipboard.writeText(colors().join("\n"));
            toast({ info: "Palette copied!", timeout: 5000 });
          } catch (error) {
            toast({
              variant: "destructive",
              info: "Unable to copy palette!",
              timeout: 5000,
            });
          }
        }}
      >
        Copy Palette
      </button>
    </div> `;
}

export default Controls;
