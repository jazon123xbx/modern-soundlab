# Modern SoundLab

Modern SoundLab is a small website that shows how a sound wave can become binary code.

## Run the website

1. Open a terminal in this project folder.
2. Start a local web server with `python -m http.server 8000`.
3. Open `http://localhost:8000` in a browser.
4. Press `Ctrl+C` in the terminal when you are finished.

The website uses JavaScript modules, so it should be opened through a local web server instead of by double-clicking `index.html`.

## Use the converter

1. Enter a frequency greater than 0 Hz.
2. Enter an amplitude from 0 to 1.
3. Choose 2 to 64 samples and 1 to 8 bits per sample.
4. Select **Convert to Binary** to view the wave facts, sample table, waveform, and binary result.
5. Select **Play Sound** to hear a one-second sine wave at the chosen frequency.

## Test cases

The Test Results table runs these cases when the page opens:

| Test | Frequency | Amplitude | Samples | Bits per sample |
| --- | --- | --- | --- | --- |
| A | 440 Hz | 0.8 | 8 | 3 |
| B | 200 Hz | 0.5 | 6 | 4 |
| C | 500 Hz | 0.9 | 5 | 3 |

## Project structure

- `index.html` contains the page sections and accessible labels.
- `css/` contains base, page, converter, result, and mobile styles.
- `js/logic/` checks input and calculates samples and binary values.
- `js/ui/` displays the results and waveform.
- `js/AudioPlayer.js` plays the sine wave.
- `js/SoundLabApp.js` connects the page controls to the app.
