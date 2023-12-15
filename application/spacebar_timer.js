
    /*
	 * spacebar_timer.js
     * Dynamic Display for Spacebar Timer
	 * 
	 * Author: Adam Gradess
	 * Last Updated: 12/15/2023
	 * 
     * Logic for updating the timer with the spacebar.
	 * 
	 * 
	 * Notes to self: -----------------------------------------------------------------
	 * 
	 * Still have to integrate with the main interface
     *  - I can grab the time data but I have to send it to the php file
     *  - How am I doing this with the manual input?
     *      - hitting submit button
	 * 
	 * 
	 */


let timing = false;
let spacebar_down = false;
let timer_started_date = undefined;

let intervalID = 0;
let elapsed_hundredths_second = 0;
let solve_time_arr = [];


// When spacebar is pressed down, the timer is either being started or stopped:
$(document).on('keydown',function(e) {
    if(e.which == 32) { // Spacebar
		var solve_time = document.getElementById('solve_time');
		spacebar_down = true;
		
		if (solve_time.innerHTML == '0.00') { // not sure why this check is here
			solve_time.style.color = '#34eb43'; // bright green means go
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



// When spacebar is released, again, either the timer is being started or stopped
$(document).keyup(function(e) {
	if(e.which == 32) { // Spacebar

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
			timerUpdating();
		}
	}
});


// This is where the time is updated
function timerUpdating() {

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
	currentTimeString += '0';	
  }
  currentTimeString += "." + hundredths;

  return currentTimeString;
}
