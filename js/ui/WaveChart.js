export default class WaveChart {
  constructor() {
    this.canvas = document.getElementById("waveform-canvas");
    this.context = this.canvas.getContext("2d");
    this.samples = [];

    window.addEventListener("resize", () => this.draw(this.samples));
  }

  // draw wave
  draw(samples) {
    this.samples = samples;
    const { width, height } = this.resizeCanvas();

    if (samples.length === 0) {
      return;
    }

    const padding = 28;
    const middle = height / 2;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    const peak = Math.max(...samples.map((sample) => Math.abs(sample.amplitude)), 0.01);

    this.context.strokeStyle = "#285076";
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.moveTo(padding, middle);
    this.context.lineTo(width - padding, middle);
    this.context.stroke();

    this.context.strokeStyle = "#3dd9ff";
    this.context.lineWidth = 2;
    this.context.beginPath();

    for (let step = 0; step <= 200; step += 1) {
      const position = step / 200;
      const x = padding + position * graphWidth;
      const y = middle - Math.sin(position * Math.PI * 2) * peak * (graphHeight / 2);

      if (step === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
    }

    this.context.stroke();
    this.drawSamplePoints(samples, padding, middle, graphWidth, graphHeight, peak);
  }

  clear() {
    this.samples = [];
    this.resizeCanvas();
  }

  resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const width = this.canvas.clientWidth;
    const height = window.innerWidth <= 520 ? 150 : 200;

    this.canvas.width = Math.round(width * ratio);
    this.canvas.height = Math.round(height * ratio);
    this.canvas.style.height = `${height}px`;
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.context.clearRect(0, 0, width, height);

    return { width, height };
  }

  drawSamplePoints(samples, padding, middle, graphWidth, graphHeight, peak) {
    this.context.fillStyle = "#3dd9ff";

    for (let index = 0; index < samples.length; index += 1) {
      const sample = samples[index];
      const x = padding + (index / samples.length) * graphWidth;
      const y = middle - (sample.amplitude / peak) * (graphHeight / 2);

      this.context.beginPath();
      this.context.arc(x, y, 4, 0, Math.PI * 2);
      this.context.fill();
    }
  }
}
