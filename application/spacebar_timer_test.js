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

import Timer from "../easytimer_dir/src/easytimer/easytimer.js";
const timer = new Timer();

/*
Failed attempt at using keypress...DO NOT TOUCH

$(document).keypress(function(event) {
	if (event.which == 70) {
    	// document.getElementById('test').innerHTML = 'haha!';
		console.log('aha!');
 	}
 });
*/

var timing = false;
// var time_recorded = false; // TODO: Added this field for keeping the time **removed
// when you stop the timer. Now, keyup does not do anything
/*
$(document).on('keydown',function(e) {
    if(e.which == 32) { // Spacebar
		var solve_time = document.getElementById('solve_time');
		console.log(solve_time);
		
		if (solve_time.innerHTML == '0.00') {
			// alert('time is 0.00');
			solve_time.style.color = '#34eb43';
		} else {
			if (timing) {
				timing = false;
				// time_recorded = true;
			} else {
				solve_time.innerHTML = '0.00';
				solve_time.style.color = '#34eb43';
			}
		}
    }
});
*/
/*
Tried to create timer here, ended up using someone else's fxn, modified

$(document).keyup(function(e) {
	if(e.which == 32) { // Spacebar
		// alert('Spacebar released');
		var solve_time = document.getElementById('solve_time');
		
		solve_time.style.color = '#ffffff';
		timing = true;
		
		// grab current time in minutes seconds milliseconds
		const start = Date.now();
		while (timing) {
			// difference between time outside loop and current time inside loop
			solve_time.innerHTML = Date.now() - start;
		}
	}
});

*/
// 


// get_elasped_time_string and setInterval copied code from stackoverflow
/*
function get_elapsed_time_string(total_hundr_seconds) {
  function pretty_time_string(num) {
    return ( num < 10 ? "0" : "" ) + num;
  }

  var hours = Math.floor(total_hundr_seconds / 360000);
  total_hundr_seconds = total_hundr_seconds % 360000;

  var minutes = Math.floor(total_hundr_seconds / 6000);
  total_hundr_seconds = total_hundr_seconds % 6000;

  var seconds = Math.floor(total_hundr_seconds / 100);
  total_hundr_seconds = total_hundr_seconds % 100;

  var hundredths = Math.floor(total_hundr_seconds);

  // Pad the minutes and seconds with leading zeros, if required
  hours = pretty_time_string(hours);
  minutes = pretty_time_string(minutes);
  seconds = pretty_time_string(seconds);
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

  return currentTimeString;
}



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

