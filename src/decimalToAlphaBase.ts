import type { Result } from "./types/result.interface";

const decimalToBase = (num: number, base: number) => {
  if (base < 2 || base > 36) {
    return "Not Valid Base";
  }
  return num.toString(base);
};

const mapToAlphabet = (num: string) => {
  const alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY";
  const result = alphabet[parseInt(num, 26)];
  return result;
};

const handleZ = (base26: string[]): string[] => {
  if (base26.length === 1) {
    if (base26[0] === "A") {
      base26[0] = "";
    } else {
      const previousLetterAsInt = parseInt(base26[0], 36) - 10;
      base26[0] = mapToAlphabet(previousLetterAsInt.toString(26));
    }
    return base26;
  } else {
    if (base26[base26.length - 1] === "A") {
      return [...handleZ(base26.slice(0, base26.length - 1)), "Z"];
    } else {
      const previousLetterAsInt = parseInt(base26[base26.length - 1], 36) - 10;
      return [
        ...base26.slice(0, base26.length - 1),
        mapToAlphabet(previousLetterAsInt.toString(26)),
      ];
    }
  }
};

const base26ToAlpha = (base26: string[]) => {
  for (let i = 0; i < base26.length; i++) {
    const letter = mapToAlphabet(base26[i]);
    base26[i] = letter;
    if (letter === "Z") {
      base26 = [...handleZ(base26.slice(0, i)), "Z", ...base26.slice(i + 1)];
    }
  }
  return base26.join("");
};

export const decimalToAlphaBase = (num: number): Result<string> => {
  if (num < 1) {
    return {
      success: false,
      message: "Number must be greater than 0",
    };
  }

  const base26 = decimalToBase(num, 26);
  const data = base26ToAlpha(base26.split(""));

  return {
    success: true,
    data,
  };
};
