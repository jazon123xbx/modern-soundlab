export default class SoundLabApp {
  constructor(validator, converter, resultView, waveChart) {
    this.validator = validator;
    this.converter = converter;
    this.resultView = resultView;
    this.waveChart = waveChart;
    this.convertButton = document.getElementById("convert-button");
  }

  start() {
    this.convertButton.addEventListener("click", () => this.convertWave());
    this.resultView.showTestResults(this.converter);
  }

  // get inputs
  getInputs() {
    return {
      frequency: document.getElementById("frequency").value,
      amplitude: document.getElementById("amplitude").value,
      numberOfSamples: document.getElementById("number-of-samples").value,
      bitsPerSample: document.getElementById("bits-per-sample").value,
    };
  }

  // check numbers
  convertWave() {
    const inputs = this.getInputs();
    const error = this.validator.check(inputs);

    if (error) {
      this.resultView.showError(error);
      this.resultView.clearResults();
      this.waveChart.clear();
      return;
    }

    const numbers = {
      frequency: Number(inputs.frequency),
      amplitude: Number(inputs.amplitude),
      numberOfSamples: Number(inputs.numberOfSamples),
      bitsPerSample: Number(inputs.bitsPerSample),
    };
    const results = this.converter.convert(numbers);

    this.resultView.showResults(inputs, results);
    this.waveChart.draw(results.samples);
  }
}
