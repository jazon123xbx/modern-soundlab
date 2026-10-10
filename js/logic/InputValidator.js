export default class InputValidator {
  check(inputs) {
    const { frequency, amplitude, numberOfSamples, bitsPerSample } = inputs || {};

    if (!this.isValidNumber(frequency) || frequency <= 0) {
      return "Frequency must be greater than 0.";
    }

    if (!this.isValidNumber(amplitude) || amplitude < 0 || amplitude > 1) {
      return "Amplitude must be from 0 to 1.";
    }

    if (!this.isWholeNumber(numberOfSamples) || numberOfSamples < 2 || numberOfSamples > 64) {
      return "Number of samples must be a whole number from 2 to 64.";
    }

    if (!this.isWholeNumber(bitsPerSample) || bitsPerSample < 1 || bitsPerSample > 8) {
      return "Bits per sample must be a whole number from 1 to 8.";
    }

    return null;
  }

  isValidNumber(value) {
    if (value === null || value === "" || (typeof value !== "number" && typeof value !== "string")) {
      return false;
    }

    if (typeof value === "string" && value.trim() === "") {
      return false;
    }

    return Number.isFinite(Number(value));
  }

  isWholeNumber(value) {
    return this.isValidNumber(value) && Number.isInteger(Number(value));
  }
}
