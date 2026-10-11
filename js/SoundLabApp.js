export default class SoundLabApp {
  constructor(validator, converter, resultView, waveChart, audioPlayer) {
    this.validator = validator;
    this.converter = converter;
    this.resultView = resultView;
    this.waveChart = waveChart;
    this.audioPlayer = audioPlayer;
    this.convertButton = document.getElementById("convert-button");
    this.playButton = document.getElementById("play-button");
  }

  start() {
    this.convertButton.addEventListener("click", () => this.convertWave());
    this.playButton.addEventListener("click", () => this.playSound());
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
    this.waveChart.draw(results.samples, numbers.amplitude);
  }

  // for audio
  async playSound() {
    const frequency = this.getInputs().frequency;

    if (!this.validator.isValidNumber(frequency) || Number(frequency) <= 0) {
      this.resultView.showError("Frequency must be greater than 0.");
      return;
    }

    try {
      const played = await this.audioPlayer.play(Number(frequency));

      if (!played) {
        this.resultView.showError("Sound is not supported in this browser.");
        return;
      }

      this.resultView.clearError();
    } catch {
      this.resultView.showError("Sound could not play.");
    }
  }
}
