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
    this.calculationSection = document.getElementById("calculation-section");
    this.frequencyInputExplanation = document.getElementById("frequency-input-explanation");
    this.amplitudeInputExplanation = document.getElementById("amplitude-input-explanation");
    this.samplesInputExplanation = document.getElementById("samples-input-explanation");
    this.bitsInputExplanation = document.getElementById("bits-input-explanation");
    this.periodCalculation = document.getElementById("period-calculation");
    this.wavelengthCalculation = document.getElementById("wavelength-calculation");
    this.levelsCalculation = document.getElementById("levels-calculation");
    this.totalBitsCalculation = document.getElementById("total-bits-calculation");
    this.sampleCalculationIntro = document.getElementById("sample-calculation-intro");
    this.sampleTimeCalculation = document.getElementById("sample-time-calculation");
    this.waveHeightCalculation = document.getElementById("wave-height-calculation");
    this.digitalLevelCalculation = document.getElementById("digital-level-calculation");
    this.binaryCalculation = document.getElementById("binary-calculation");
    this.simpleExplanation = document.getElementById("simple-explanation");
    this.testResultsBody = document.querySelector("#test-results tbody");
    this.calculationsTab = document.getElementById("calculations-tab");
    this.binaryStepsTab = document.getElementById("binary-steps-tab");
    this.calculationsPanel = document.getElementById("calculations-panel");
    this.binaryStepsPanel = document.getElementById("binary-steps-panel");
    this.binaryDivisionSteps = document.getElementById("binary-division-steps");
    this.binaryPaddingExplanation = document.getElementById("binary-padding-explanation");
    this.guideTabs = [this.calculationsTab, this.binaryStepsTab];

    this.guideTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => this.selectGuideTab(index));
      tab.addEventListener("keydown", (event) => this.handleGuideTabKeydown(event, index));
    });
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
    this.showCalculationExplanation(inputs, results);
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
    this.clearCalculationExplanation();
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

  showCalculationExplanation(inputs, results) {
    const sample = results.samples[1];
    const sampleIndex = sample.sampleNumber - 1;
    const wavelength = this.formatWavelength(results.wavelengthInMeters);
    const sampleTime = this.formatNumber(sample.timeInMilliseconds);
    const waveHeight = this.formatNumber(sample.amplitude);
    const bitsPerSample = Number(inputs.bitsPerSample);
    const paddingSample = this.getPaddingExample(results.samples, bitsPerSample);

    this.frequencyInputExplanation.textContent = `Frequency: ${inputs.frequency} Hz. Hz means wave cycles per second, so the wave repeats ${inputs.frequency} times each second.`;
    this.amplitudeInputExplanation.textContent = `Amplitude: ${inputs.amplitude}. It is the relative wave height on this app's 0 to 1 scale, so it has no physical unit.`;
    this.samplesInputExplanation.textContent = `Samples: ${inputs.numberOfSamples}. These are ${inputs.numberOfSamples} points measured from one wave cycle.`;
    this.bitsInputExplanation.textContent = `Bits per sample: ${inputs.bitsPerSample}. Bits are binary digits, so each measured point uses ${inputs.bitsPerSample} zeros and ones.`;
    this.periodCalculation.textContent = `Period: 1000 / ${inputs.frequency} ≈ ${this.formatPeriod(results.periodInMilliseconds)} ms. The 1000 changes seconds into milliseconds.`;
    this.wavelengthCalculation.textContent = `Wavelength: 343 m/s / ${inputs.frequency} Hz ≈ ${wavelength}. The 343 m/s is the approximate speed of sound in air.`;
    this.levelsCalculation.textContent = `Digital levels: 2 raised to ${inputs.bitsPerSample} = ${results.numberOfLevels}. The 2 comes from binary digits 0 and 1. This is how many whole-number levels the app can use.`;
    this.sampleTimeCalculation.textContent = `Sample 2 time: (1 x period) / ${inputs.numberOfSamples} ≈ ${sampleTime} ms. Sample 2 uses index 1 because counting starts at 0.`;
    this.waveHeightCalculation.textContent = `Sample 2 wave height: ${inputs.amplitude} x sin((2 x pi x ${sampleIndex}) / ${inputs.numberOfSamples}) ≈ ${waveHeight}. The input amplitude sets the height, and this result has no physical unit.`;
    this.digitalLevelCalculation.textContent = `Sample 2 digital level: round(((unrounded wave height + 1) / 2) x (${results.numberOfLevels} - 1)) = ${sample.digitalLevel}.`;
    this.totalBitsCalculation.textContent = `Total bits: ${inputs.numberOfSamples} x ${inputs.bitsPerSample} = ${results.totalBits} bits. This is the length of the complete binary sequence.`;
    this.sampleCalculationIntro.textContent = `Sample ${sample.sampleNumber} has wave height ${waveHeight} and digital level ${sample.digitalLevel}. Divide the level by 2 until the quotient is 0.`;
    this.showBinaryDivisionSteps(sample, bitsPerSample, paddingSample);
    this.binaryCalculation.textContent = `Final binary for sample ${sample.sampleNumber}: ${sample.binary}. All sample binaries join in sample order to make: ${results.binaryResult}. Total bits: ${inputs.numberOfSamples} x ${inputs.bitsPerSample} = ${results.totalBits}.`;
    this.simpleExplanation.textContent = `The app measures points from the wave, turns each point into a whole-number level, and writes that level in binary. More bits give more possible levels and more detail.`;
    this.selectGuideTab(0);
    this.calculationSection.hidden = false;
  }

  clearCalculationExplanation() {
    this.calculationSection.hidden = true;
    this.frequencyInputExplanation.textContent = "";
    this.amplitudeInputExplanation.textContent = "";
    this.samplesInputExplanation.textContent = "";
    this.bitsInputExplanation.textContent = "";
    this.periodCalculation.textContent = "";
    this.wavelengthCalculation.textContent = "";
    this.levelsCalculation.textContent = "";
    this.totalBitsCalculation.textContent = "";
    this.sampleCalculationIntro.textContent = "";
    this.sampleTimeCalculation.textContent = "";
    this.waveHeightCalculation.textContent = "";
    this.digitalLevelCalculation.textContent = "";
    this.binaryCalculation.textContent = "";
    this.binaryDivisionSteps.replaceChildren();
    this.binaryPaddingExplanation.textContent = "";
    this.simpleExplanation.textContent = "";
    this.selectGuideTab(0);
  }

  getPaddingExample(samples, bitsPerSample) {
    const needsPadding = (sample) => sample.digitalLevel.toString(2).length < bitsPerSample;

    return samples.find((sample) => sample.digitalLevel === 0 && needsPadding(sample))
      ?? samples.find(needsPadding)
      ?? samples.find((sample) => sample.digitalLevel === 0)
      ?? samples[0];
  }

  showBinaryDivisionSteps(sample, bitsPerSample, paddingSample) {
    this.binaryDivisionSteps.replaceChildren();

    let quotient = sample.digitalLevel;
    const remainders = [];

    do {
      const remainder = quotient % 2;
      const nextQuotient = Math.floor(quotient / 2);
      const row = document.createElement("tr");
      const division = document.createElement("td");
      const quotientCell = document.createElement("td");
      const remainderCell = document.createElement("td");

      remainders.push(remainder);
      division.textContent = `${quotient} / 2`;
      quotientCell.textContent = nextQuotient;
      remainderCell.textContent = remainder;
      row.append(division, quotientCell, remainderCell);
      this.binaryDivisionSteps.append(row);
      quotient = nextQuotient;
    } while (quotient > 0);

    const unpaddedBinary = remainders.reverse().join("");
    const leadingZeros = bitsPerSample - unpaddedBinary.length;
    const paddingBinary = paddingSample.digitalLevel.toString(2);
    const paddingZeros = bitsPerSample - paddingBinary.length;

    if (leadingZeros > 0) {
      this.binaryPaddingExplanation.textContent = `Read sample ${sample.sampleNumber}'s remainders from bottom to top: ${unpaddedBinary}. Add ${leadingZeros} leading ${leadingZeros === 1 ? "zero" : "zeros"} to make ${bitsPerSample} bits: ${sample.binary}.`;
    } else if (paddingZeros > 0) {
      this.binaryPaddingExplanation.textContent = `Read sample ${sample.sampleNumber}'s remainders from bottom to top: ${unpaddedBinary}. For a padding example, sample ${paddingSample.sampleNumber} has level ${paddingSample.digitalLevel}: ${paddingBinary} becomes ${paddingSample.binary} after adding ${paddingZeros} leading ${paddingZeros === 1 ? "zero" : "zeros"}.`;
    } else {
      this.binaryPaddingExplanation.textContent = `Read sample ${sample.sampleNumber}'s remainders from bottom to top: ${unpaddedBinary}. No current sample needs leading zeros for ${bitsPerSample} bit${bitsPerSample === 1 ? "" : "s"}.`;
    }
  }

  selectGuideTab(index, moveFocus = false) {
    const panels = [this.calculationsPanel, this.binaryStepsPanel];

    this.guideTabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;

      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[tabIndex].hidden = !selected;
    });

    if (moveFocus) {
      this.guideTabs[index].focus();
    }
  }

  handleGuideTabKeydown(event, index) {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % this.guideTabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + this.guideTabs.length) % this.guideTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = this.guideTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    this.selectGuideTab(nextIndex, true);
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
