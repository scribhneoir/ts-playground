const decimalToBase = (num: number, base: number) => {
  if (base < 2 || base > 36) {
    return "Not Valid Base";
  }
  return num.toString(base);
};

const handleZeros = (base26: string[]) => {
  for (let i = 0; i < base26.length; i++) {
    if (base26[i] === "0") {
      base26[i] = "Z";
      const next = parseInt(base26[i - 1], 36) - 10;
      if (next === 0) {
        base26[i - 1] = "";
        continue;
      }
      const alphabet = "0ABCDEFGHIJKLMNOPQRSTUVWXY";
      base26[i - 1] = alphabet[next];
    }
  }
  return base26.join("");
};

const mapToAlphabet = (num: string) => {
  const alphabet = "0ABCDEFGHIJKLMNOPQRSTUVWXY";
  const result = alphabet[parseInt(num, 26)];
  return result;
};

const numberToAlphabet = (num: number) => {
  if (num < 1) {
    return {
      success: false,
      error: "Number must be greater than 0",
    };
  }

  const base26 = decimalToBase(num, 26);
  const alpha = base26.split("").map(mapToAlphabet);
  const result = handleZeros(alpha);

  return result;
};

let data = "";
for (let i = 1; i <= 13520; i++) {
  data += `${numberToAlphabet(i)}\n`;
}

await Bun.write("output.txt", data);
