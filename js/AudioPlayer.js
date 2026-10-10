export default class AudioPlayer {
  constructor() {
    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = null;
    this.oscillator = null;
    this.gain = null;
  }

  // play sound
  async play(frequency) {
    if (!this.AudioContext) {
      return false;
    }

    if (!this.audioContext) {
      this.audioContext = new this.AudioContext();
    }

    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    const startTime = this.stop();
    const endTime = startTime + 1;
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.03);
    gain.gain.setValueAtTime(0.1, endTime - 0.03);
    gain.gain.linearRampToValueAtTime(0.0001, endTime);

    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(endTime);

    this.oscillator = oscillator;
    this.gain = gain;
    oscillator.onended = () => this.finish(oscillator, gain);

    return true;
  }

  // stop sound
  stop() {
    if (!this.oscillator) {
      return this.audioContext.currentTime;
    }

    const stopTime = this.audioContext.currentTime + 0.03;
    this.gain.gain.cancelScheduledValues(this.audioContext.currentTime);
    this.gain.gain.setTargetAtTime(0.0001, this.audioContext.currentTime, 0.01);
    this.oscillator.stop(stopTime);

    return stopTime;
  }

  finish(oscillator, gain) {
    oscillator.disconnect();
    gain.disconnect();

    if (this.oscillator === oscillator) {
      this.oscillator = null;
      this.gain = null;
    }
  }
}
