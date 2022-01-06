# Cubing Sessions

My first attempt at creating my own Rubik's Cube timing interface with PHP and JS!

I haved named it the PA Timer for fun, as I hail from the great state of Pennsylvania.

This kind of interface can be used to train for competitive Rubik's Cube solving, where the puzzle is solved for speed.
Here are two examples of Rubik's Cube timing interfaces that are currently very popular in the Rubik's Cube
community: [cstimer](https://cstimer.net/timer.php) and [cubedesk](https://cubedesk.io). In these interface
examples, some basic functions are: entering times, seeing statistics, keeping track of best times, generating
scrambles (moves to mix up the puzzle), etc.

Currently, my timer:

- Accepts times from a text input field (in the format hh:mm:ss.ms).
- Lists out current times for a puzzle.
- Changes puzzle type.
- Saves times with PHP's global SESSION variables, which persist
throughout a single browser session.
- Also permanently stores times in a JSON file, as not working with "big" data.
- Shows/hides desired averages (Ex: average of 5 is abbreviated ao5)
- Generates scrambles (just for 3x3) using [scrambo](https://www.npmjs.com/package/scrambo).

Notes:
Averages in competitive Rubik's Cube solving with 5 or more times are calculated by trimming off some outliers.
For example, an average of 5 is calcualte by removing the best and worst solves and averaging the three in the middle.
The two files beginning with spacebar_timer_test were from several attempts to start and stop times with the spacebar.

### Current/Future Additions

N/A
