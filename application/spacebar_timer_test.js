/*
4 states:

spacebar down, timer not running
spacebar released, timer running
spacebar down, timer running
spacebar released, timer not running
*/


// installing javascript code from github:
// https://www.youtube.com/watch?v=635N7rU5aPo

// var { Timer } = require("easytimer.js").Timer;
// var timerInstance = new Timer();

// import Timer from "../easytimer_dir/src/easytimer/easytimer.js";
// const timer = new Timer();

/*
Failed attempt at using keypress...DO NOT TOUCH

$(document).keypress(function(event) {
	if (event.which == 70) {
    	// document.getElementById('test').innerHTML = 'haha!';
		console.log('aha!');
 	}
 });
*/

let timing = false;
let spacebar_down = false;
let timer_started_date = undefined;

let intervalID = 0;
let elapsed_hundredths_second = 0;
let solve_time_arr = [];

// var time_recorded = false; // TODO: Added this field for keeping the time **removed
// when you stop the timer. Now, keyup does not do anything

// When spacebar is pressed down
$(document).on('keydown',function(e) {
    if(e.which == 32) { // Spacebar
		var solve_time = document.getElementById('solve_time');
		spacebar_down = true;
		
		if (solve_time.innerHTML == '0.00') { // not sure why this check is here
			// alert('time is 0.00');
			solve_time.style.color = '#34eb43';
		} else {
			if (!timing) {
				solve_time.innerHTML = '0.00';
				solve_time.style.color = '#34eb43';
			} else {
				storeTime(elapsed_hundredths_second);
			}
		}
    }
});


// Tried to create timer here, may also someone else's fxn, modified

// When spacebar is released
$(document).keyup(function(e) {
	if(e.which == 32) { // Spacebar
		// alert('Spacebar released');
		// case 1: spacebar released after starting timer
		// case 2: spacebar released after stopping timer

		var solve_time = document.getElementById('solve_time');
		console.log(solve_time);
		spacebar_down = true;		
		solve_time.style.color = '#ffffff';
		
		if (!timing) {
			timing = true;
		} else {
			timing = false;
		}
		
		if (timing) {
		// grab current time in minutes seconds milliseconds
			timer_started_date = Date.now();
		// while (timing) {
		// 	// difference between time outside loop and current time inside loop
		// 	solve_time.innerHTML = Date.now() - start;
		// }
			timerUpdating(timer_started_date);
		}
	}
});

// This is where the time is updated
function timerUpdating(solve_time_start_date) {
	document.getElementById("solve_time").innerHTML = "0.01";
	// at every hundreth of a second, calculate the difference in time between
	// param and date.now()

	elapsed_hundredths_second = 0;
				
	intervalID = setInterval(function() {
		// increment the elapsed time by 1
		elapsed_hundredths_second = elapsed_hundredths_second + 1;
		// then 'print' this to the timer
		solve_time.innerHTML = get_elapsed_time_string(elapsed_hundredths_second);
	}, 10);
}

function storeTime(elapsed_hundredths_second) {
	console.log(`stopping timer at ${get_elapsed_time_string(elapsed_hundredths_second)}`);

	solve_time_arr.push({ text: get_elapsed_time_string(elapsed_hundredths_second), hund_int: elapsed_hundredths_second})
	console.log(solve_time_arr);
	clearInterval(intervalID);
}

// Receives an integer representing the number of seconds in hundredths
// and returns the appropriate string
// NOTE to self: get_elasped_time_string and setInterval copied code from stackoverflow

function get_elapsed_time_string(total_hundr_seconds) {
  console.log(total_hundr_seconds);
  function pretty_time_string(num) {
    return ( num < 10 ? "0" : "" ) + num;
  }

  let hundreths_remainder = total_hundr_seconds;

  var hours = Math.floor(hundreths_remainder / 360000);
  hundreths_remainder = hundreths_remainder % 360000;

  var minutes = Math.floor(hundreths_remainder / 6000);
  hundreths_remainder = hundreths_remainder % 6000;

  var seconds = Math.floor(hundreths_remainder / 100);
  hundreths_remainder = hundreths_remainder % 100;

  var hundredths = Math.floor(hundreths_remainder);

  // Pad the minutes and seconds with leading zeros, if required
  minutes = total_hundr_seconds >= 360000 ? pretty_time_string(minutes) : minutes;
  seconds = total_hundr_seconds >= 6000 ? pretty_time_string(seconds) : seconds;
  hundredths = pretty_time_string(hundredths);

  // Compose the string for display
  var currentTimeString = "";

  if (hours != '00') currentTimeString += hours + ":";
  if (minutes != '00') currentTimeString += minutes + ":";
  if (seconds != '00') {
	currentTimeString += seconds;
  } else {
	currentTimeString += '00';	
  }
  currentTimeString += "." + hundredths;

//   document.getElementById("solve_time_test").innerHTML = currentTimeString;
  return currentTimeString;
}

/*

$(document).keyup(function(e) {
	if(e.which == 32) { // Spacebar
			
			
			// 1. clearInterval is global
			// 2. Store the end value of the time in a different variable, display that
			// variable, then clear the interval
			
			var solve_time = document.getElementById('solve_time');
//			solve_time.style.color = '#ffffff'; 	// color change, ignore for now

			var elapsed_hundredths_second = 0;
			
			var intervalID = setInterval(function() {
				elapsed_hundredths_second = elapsed_hundredths_second + 1;
				solve_time.innerHTML = get_elapsed_time_string(elapsed_hundredths_second);
			}, 10);
				
			if (!timing) {
				timing = true;
				
				console.log('Timing');
				
			} else {
				// stop timing
				timing = false;
				clearInterval(intervalID);
				solve_time.innerHTML == '0.00';
			}
	}
});
*/
/*
$(document).keyup(function(e) {
	if(e.which == 32) { // Spacebar
		// alert('Spacebar released');
			
			var solve_time = document.getElementById('solve_time');
			
//			solve_time.style.color = '#ffffff'; 	// color change, ignore for now
			timing = true;
			
			// grab current time in minutes seconds milliseconds
			// const start = Date.now();
			if (timing) {
				console.log('Timing');
				var elapsed_hundredths_second = 0;
				
				var intervalID = setInterval(function() {
					elapsed_hundredths_second = elapsed_hundredths_second + 1;
					solve_time.innerHTML = get_elapsed_time_string(elapsed_hundredths_second);
				}, 10);
				
				$(document).keydown(function(e) {
					if (e.which == 32) clearInterval(intervalID);
				});
			}
	}
});
*/

