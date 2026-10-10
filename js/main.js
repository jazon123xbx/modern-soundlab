import SoundLabApp from "./SoundLabApp.js";
import AudioPlayer from "./AudioPlayer.js";
import InputValidator from "./logic/InputValidator.js";
import WaveConverter from "./logic/WaveConverter.js";
import ResultView from "./ui/ResultView.js";
import WaveChart from "./ui/WaveChart.js";

const app = new SoundLabApp(
  new InputValidator(),
  new WaveConverter(),
  new ResultView(),
  new WaveChart(),
  new AudioPlayer(),
);

app.start();
