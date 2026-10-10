export default class ResultView {
  constructor() {
    this.warning = document.getElementById("input-warning");
    this.amplitudeFact = document.getElementById("amplitude-fact");
    this.frequencyFact = document.getElementById("frequency-fact");
    this.periodFact = document.getElementById("period-fact");
    this.wavelengthFact = document.getElementById("wavelength-fact");
    this.sampleTableBody = document.getElementById("sample-table-body");
    this.binaryOutput = document.getElementById("binary-output");
    this.totalBits = document.getElementById("total-bits");
    this.testResultsBody = document.querySelector("#test-results tbody");
  }

  // show results
  showResults(inputs, results) {
    this.clearError();
    this.amplitudeFact.textContent = inputs.amplitude;
    this.frequencyFact.textContent = `${inputs.frequency} Hz`;
    this.periodFact.textContent = `${this.formatPeriod(results.periodInMilliseconds)} ms`;
    this.wavelengthFact.textContent = this.formatWavelength(results.wavelengthInMeters);
    this.showSamples(results.samples);
    this.binaryOutput.textContent = `Complete Binary Sequence: ${results.binaryResult}`;
    this.totalBits.textContent = `Total Number of Bits: ${results.totalBits}`;
  }

  showError(message) {
    this.warning.textContent = message;
    this.warning.hidden = false;
  }

  clearError() {
    this.warning.textContent = "";
    this.warning.hidden = true;
  }

  clearResults() {
    const waiting = "Waiting for conversion";

    this.amplitudeFact.textContent = waiting;
    this.frequencyFact.textContent = waiting;
    this.periodFact.textContent = waiting;
    this.wavelengthFact.textContent = waiting;
    this.sampleTableBody.replaceChildren();
    this.binaryOutput.textContent = `Complete Binary Sequence: ${waiting}`;
    this.totalBits.textContent = `Total Number of Bits: ${waiting}`;
  }

  showTestResults(converter) {
    const tests = [
      { name: "A", frequency: 440, amplitude: 0.8, numberOfSamples: 8, bitsPerSample: 3 },
      { name: "B", frequency: 200, amplitude: 0.5, numberOfSamples: 6, bitsPerSample: 4 },
      { name: "C", frequency: 500, amplitude: 0.9, numberOfSamples: 5, bitsPerSample: 3 },
    ];

    this.testResultsBody.replaceChildren();

    for (const test of tests) {
      const results = converter.convert(test);
      const row = document.createElement("tr");
      const values = [
        test.name,
        test.frequency,
        test.amplitude,
        test.numberOfSamples,
        test.bitsPerSample,
        `${this.formatPeriod(results.periodInMilliseconds)} ms`,
        this.formatWavelength(results.wavelengthInMeters),
        results.totalBits,
        results.binaryResult,
      ];

      for (let index = 0; index < values.length; index += 1) {
        const cell = document.createElement(index === 0 ? "th" : "td");
        const value = values[index];
        if (index === 0) {
          cell.scope = "row";
        }
        cell.textContent = value;
        row.append(cell);
      }

      this.testResultsBody.append(row);
    }
  }

  showSamples(samples) {
    this.sampleTableBody.replaceChildren();

    for (const sample of samples) {
      const row = document.createElement("tr");
      const values = [
        sample.sampleNumber,
        this.formatNumber(sample.timeInMilliseconds),
        this.formatNumber(sample.amplitude),
        sample.digitalLevel,
        sample.binary,
      ];

      for (const value of values) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      }

      this.sampleTableBody.append(row);
    }
  }

  formatPeriod(value) {
    return value.toFixed(2);
  }

  formatWavelength(value) {
    if (value >= 1) {
      return `${value.toFixed(2)} m`;
    }

    return `${(value * 100).toFixed(1)} cm`;
  }

  formatNumber(value) {
    return value.toFixed(2);
  }
}
