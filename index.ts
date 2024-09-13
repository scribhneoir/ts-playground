import { alphaBaseToDecimal } from "./src/alphaBaseToDecimal";
import { decimalToAlphaBase } from "./src/decimalToAlphaBase";

let data = "";
for (let i = 1; i <= 13520; i++) {
  const baseAB = decimalToAlphaBase(i);
  if (baseAB.success) {
    const base10 = alphaBaseToDecimal(baseAB.data);
    data += `${baseAB.data}:${base10}\n`;
  } else {
    data += `ERROR: ${baseAB.message}\n`;
  }
}

await Bun.write("output.txt", data);
