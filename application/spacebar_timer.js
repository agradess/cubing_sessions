
    /*
	 * spacebar_timer.js
     * Dynamic Display for Spacebar Timer
	 * 
	 * Author: Adam Gradess
	 * Last Updated: 12/17/2023
	 * 
     * Logic for updating the timer with the spacebar.
	 * 
	 * 
	 * Notes to self: -----------------------------------------------------------------
	 * 
	 * 
	 * 
	 */


let timing = false;
let inspecting = false; // addition
let spacebar_down = false;
let timer_started_date = undefined;

let intervalID = 0;
let elapsed_hundredths_second = 0;
let solve_time_arr = [];


// When spacebar is pressed down
$(document).on('keydown',function(e) {
	if(e.which == 32) { // Spacebar
		var solve_time = document.getElementById('solve_time');
		spacebar_down = true;
		
		if (!timing) {
			solve_time.innerHTML = '0.00';
			if (!inspecting) {
				solve_time.style.color = '#ff4545'; // red
			} else {
				clearInterval(intervalID);
				solve_time.style.color = '#34eb43'; // green
			}
		} else {
			storeTime(elapsed_hundredths_second);
		}
	}
});


// When spacebar is released
$(document).keyup(function(e) {
	if(e.which == 32) { // Spacebar

		var solve_time = document.getElementById('solve_time');
		console.log(solve_time);
		spacebar_down = true;		
		
		if (!timing) {
			if (!inspecting) {
				inspecting = true;
				startInspection();				
			} else {
				inspecting = false;
				timing = true;
				solve_time.style.color = '#ffffff';
			}
		} else {
			timing = false;
		}
		
		if (timing) {
			timerUpdating();
		}
	}
});

function startInspection() {
	document.getElementById("solve_time").innerHTML = "15.00";
	let solve_penalty = document.querySelector('[name="solve_penalty"]');

	// will see if this has to be a global value later
	let inspection_remaining = 1500;
	intervalID = setInterval(function() {
		inspection_remaining -= 1;

		if (inspection_remaining >= 0)
			solve_time.innerHTML = get_elapsed_time_string(inspection_remaining);
		else if (inspection_remaining >= -200 && inspection_remaining < 0) {
			solve_time.innerHTML = "+2";
			solve_penalty.value = 2;
		} else
			solve_time.innerHTML = "DNF"; // note: not adding penalty for dnf at the moment 
	}, 10);
}
	

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
    const solve_time_str = get_elapsed_time_string(elapsed_hundredths_second);
	console.log(`stopping timer at ${solve_time_str}`);

    // NOTE: line below used for debugging purposes, solve_time_arr does not persist
	solve_time_arr.push({ text: solve_time_str, hund_int: elapsed_hundredths_second});

    let hidden_solve_time = document.querySelector('[name="solve_time"]');
	let solve_penalty = document.querySelector('[name="solve_penalty"]');
	
	hidden_solve_time.value = solve_time_str;

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
