import { DerivativeEntity, ParticleEntity } from "promethium-js";
import { adaptMemo } from "promethium-js";

export const globalState = new ParticleEntity({
  controlsData: {
    startColor: "#ffffff",
    endColor: "#000000",
    numberOfColors: 7,
    maxNumberOfColors: 20,
    minNumberOfColors: 2,
  },
});

const colorHexAmount = (startAmount, i, delta) =>
  Math.round(startAmount + i * delta)
    .toString(16)
    .padStart(2, "0");

export const globalDerivedState = new DerivativeEntity({
  colors: adaptMemo(() => {
    const [controlsData] = globalState.adaptParticle("controlsData");

    const startColor = controlsData().startColor;
    const endColor = controlsData().endColor;
    const colors = [];
    const numberOfColors = controlsData().numberOfColors;

    const startRedAmount = parseInt(startColor.slice(1, 3), 16);
    const startGreenAmount = parseInt(startColor.slice(3, 5), 16);
    const startBlueAmount = parseInt(startColor.slice(5), 16);

    const endRedAmount = parseInt(endColor.slice(1, 3), 16);
    const endGreenAmount = parseInt(endColor.slice(3, 5), 16);
    const endBlueAmount = parseInt(endColor.slice(5), 16);

    const redDelta = (endRedAmount - startRedAmount) / (numberOfColors - 1);
    const greenDelta =
      (endGreenAmount - startGreenAmount) / (numberOfColors - 1);
    const blueDelta = (endBlueAmount - startBlueAmount) / (numberOfColors - 1);

    for (let i = 0; i < numberOfColors; i++) {
      const redHexAmount = colorHexAmount(startRedAmount, i, redDelta);
      const greenHexAmount = colorHexAmount(startGreenAmount, i, greenDelta);
      const blueHexAmount = colorHexAmount(startBlueAmount, i, blueDelta);
      colors.push(`#${redHexAmount}${greenHexAmount}${blueHexAmount}`);
    }

    return colors;
  }),
});
