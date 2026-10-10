export default class WaveConverter {
  convert(inputs) {
    const { frequency, amplitude, numberOfSamples, bitsPerSample } = inputs;
    const periodInSeconds = 1 / frequency;
    const periodInMilliseconds = 1000 / frequency;
    const wavelengthInMeters = 343 / frequency;
    const numberOfLevels = 2 ** bitsPerSample;
    const samples = this.getSamples(
      amplitude,
      numberOfSamples,
      bitsPerSample,
      periodInSeconds,
      numberOfLevels,
    );

    return {
      periodInSeconds,
      periodInMilliseconds,
      wavelengthInMeters,
      numberOfLevels,
      samples,
      binaryResult: samples.map((sample) => sample.binary).join(" "),
      totalBits: numberOfSamples * bitsPerSample,
    };
  }

  // get samples
  getSamples(amplitude, numberOfSamples, bitsPerSample, periodInSeconds, numberOfLevels) {
    const samples = [];

    // calculate wave
    for (let i = 0; i < numberOfSamples; i += 1) {
      const timeInSeconds = (i * periodInSeconds) / numberOfSamples;
      const height = amplitude * Math.sin((2 * Math.PI * i) / numberOfSamples);
      const digitalLevel = Math.round(((height + 1) / 2) * (numberOfLevels - 1));

      samples.push({
        sampleNumber: i + 1,
        timeInMilliseconds: timeInSeconds * 1000,
        amplitude: height,
        digitalLevel,
        binary: this.toBinary(digitalLevel, bitsPerSample),
      });
    }

    return samples;
  }

  // change to binary
  toBinary(level, bitsPerSample) {
    return level.toString(2).padStart(bitsPerSample, "0");
  }
}
