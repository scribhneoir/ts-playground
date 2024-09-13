const mapToAlphabet = (num: string, offset = 0) => {
  const alphabet = "ZABCDEFGHIJKLMNOPQRSTUVWXY";
  const index = alphabet.indexOf(num);
  const result = index.toString(26);
  return result;
};

const handleZ = (ab: string[]): string[] => {
  if (ab.length === 1) {
    if (ab[0] === "") {
      ab[0] = "A";
    } else {
      const letter = mapToAlphabet(ab[ab.length - 1], 1);
      ab[0] = letter;
    }
    return ab;
  } else {
    if (ab[ab.length - 1] === "Z") {
      return [...handleZ(ab.slice(0, ab.length - 1)), "A"];
    } else {
      const letter = mapToAlphabet(ab[ab.length - 1], 1);
      return [...ab.slice(0, ab.length - 1), letter];
    }
  }
};

const abToBase26 = (ab: string[]) => {
  for (let i = ab.length - 1; i >= 0; i--) {
    if (ab[i] === "Z") {
      ab = [...handleZ(ab.slice(0, i)), "0", ...ab.slice(i + 1)];
    } else if (ab[i] !== "") {
      const letter = mapToAlphabet(ab[i]);
      ab[i] = letter;
    }
  }
  return ab.join("");
};

export const alphaBaseToDecimal = (ab: string) => {
  const padded = ["", ...ab.split("")];
  const base26 = abToBase26(padded);
  const result = parseInt(base26, 26);
  return result;
};
