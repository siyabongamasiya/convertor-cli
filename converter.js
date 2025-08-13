let process = require("process");
let fraction = require('fractional').Fraction

const tempRegex =
  /^node\s+converter\.js\s+temp\s+--from\s+([CFK])\s+--to\s+([CFK])\s+(-?\d+(\.\d+)?)$/i;
const sciRegex = /^node\s+converter\.js\s+to-sci\s+(-?\d+(\.\d+)?)$/i;
const prefixRegex =
  /^node\s+converter\.js\s+prefix\s+--from\s+([a-zA-Z]+)\s+--to\s+([a-zA-Z]+)\s+(-?\d+(\.\d+)?)$/i;
const fractionRegex =
  /^node\s+converter\.js\s+to-fraction\s+(-?\d+(\.\d+)?(\.\.\.)?)$/i;

//utility functions
//temps
const convertFromCelsius = (value) => {
  const celsius = parseFloat(value);

  if (isNaN(celsius)) {
    console.log("Input is not a Number!!");
    return;
  }

  const fahrenheit = (celsius * 9) / 5 + 32;
  console.log(`The Value is ${fahrenheit.toFixed(2)} Fahrenheit!!`);
};

const convertFromFahrenheit = (value) => {
  const fahrenheit = parseFloat(value);

  if (isNaN(fahrenheit)) {
    console.log("Input is not a Number!!");
    return;
  }

  const celsius = ((fahrenheit - 32) * 5) / 9;
  console.log(`The value is ${celsius.toFixed(2)} celcius!!`);
};

//scientific
function getSuperscript(num) {
  const superscripts = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
    "-": "⁻",
  };
  return num
    .toString()
    .split("")
    .map((char) => superscripts[char] || char)
    .join("");
}

//format command
const formatCommand = (array) => {
  array[0] = "node";
  array[1] = "converter.js";

  return array.join(" ");
};

//main function

const convert = (string) => {
  if (tempRegex.test(string)) {
    convertTemp(process.argv[4], process.argv[7]);
  } else if (sciRegex.test(string)) {
    convertToScientific(process.argv[3]);
  } else if (prefixRegex.test(string)) {
    convertMetricPrefixes(process.argv[4], process.argv[6], process.argv[7]);
  } else if (fractionRegex.test(string)) {
    convertDecimalToFraction(process.argv[3]);
  } else if (string === "node converter.js") {
    console.log(
      "below are hints: \n" +
      "1) Temperature convertion -> node converter.js temp --from C --to F 30\n" + 
      "2) scientific notation -> node converter.js to-sci 637.8 \n"+
      "3) Prefix convertion ->  node converter.js prefix --from MHz --to kHz 1\n" +
      "4) decimal to fraction -> node converter.js to-fraction 0.444..."
    );
  }else {
    console.log(
      "Invalid command,Please enter a valid command...below are hints: \n" +
      "1) Temperature convertion -> node converter.js temp --from C --to F 30 \n" + 
      "2) scientific notation -> node converter.js to-sci 637.8 \n"+
      "3)Prefix convertion ->  node converter.js prefix --from MHz --to kHz 1 \n" +
      "4) decimal to fraction -> node converter.js to-fraction 0.444..."
    );
  }
};

//sub functions
const convertTemp = (fifthParam, convertibleValue) => {
  if (fifthParam === "C") {
    convertFromCelsius(convertibleValue);
  } else {
    convertFromFahrenheit(convertibleValue);
  }
};

const convertToScientific = (value) => {
  const number = parseFloat(value);

  if (isNaN(number)) {
    console.log("Input is not a number!!");
    return;
  }

  if (number === 0) {
    console.log("0 = 0.0 × 10⁰");
    return;
  }

  const exponent = Math.floor(Math.log10(Math.abs(number)));
  const mantissa = number / Math.pow(10, exponent);

  console.log(
    `${number} = ${mantissa.toFixed(2)} × 10${getSuperscript(exponent)}`
  );
};

const convertMetricPrefixes = (fromPref, toPref, convertibleValue) => {
  const value = parseFloat(convertibleValue);
  const fromPrefix = fromPref[0];
  const toPrefix = toPref[0];

  if (isNaN(value)) {
    console.log("Input is not a number!!");
    return;
  }

  const prefixValues = {
    T: 1e12,
    G: 1e9,
    M: 1e6,
    k: 1e3,
    "": 1,
    m: 1e-3,
    μ: 1e-6,
    n: 1e-9,
    p: 1e-12,
  };

  const fromValue = prefixValues[fromPrefix];
  const toValue = prefixValues[toPrefix];

  const baseValue = value * fromValue;
  const result = baseValue / toValue;

  console.log(
    `The results are ${value} ${fromPref} = ${result.toExponential(
      3
    )} ${toPref}`
  );
};

const convertDecimalToFraction = (convertibleValue) => {
  console.log(parseFloat(convertibleValue))
  frac = new Fraction(parseFloat(convertibleValue));
  console.log(frac.toString())
};

convert(formatCommand(process.argv));
