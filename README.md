# Converter CLI

A simple Command Line Interface (CLI) tool built with Node.js that performs different conversions:

- Temperature conversion (Celsius ↔ Fahrenheit)
- Scientific notation
- Metric prefix conversions (e.g., MHz ↔ kHz)
- Decimal to fraction

---

## Installation

1. Clone or download the project.  
2. Navigate into the project folder.  
3. Install dependencies:

```bash
npm install
```

This will install the [fractional](https://www.npmjs.com/package/fractional) library used for fraction conversions.

---

## Usage

Run the CLI tool with **Node.js**:

```bash
node converter.js <command>
```

If you run only:

```bash
node converter.js
```

It will display a help message with available commands.

---

## Commands

### 1. Temperature Conversion

Convert temperatures between Celsius and Fahrenheit.

```bash
node converter.js temp --from C --to F 30
```

Output:
```
The Value is 86.00 Fahrenheit!!
```

```bash
node converter.js temp --from F --to C 98.6
```

Output:
```
The value is 37.00 celcius!!
```

---

### 2. Scientific Notation

Convert a number to scientific notation.

```bash
node converter.js to-sci 637.8
```

Output:
```
637.8 = 6.38 × 10²
```

---

### 3. Metric Prefix Conversion

Convert values between metric prefixes (T, G, M, k, "", m, μ, n, p).

```bash
node converter.js prefix --from MHz --to kHz 1
```

Output:
```
The results are 1 MHz = 1.000e+03 kHz
```

---

### 4. Decimal to Fraction

Convert a decimal into a fraction.

```bash
node converter.js to-fraction 0.444...
```

Output:
```
0.444...
4/9
```

---

## Dependencies

- [fractional](https://www.npmjs.com/package/fractional) – for converting decimals into fractions.
