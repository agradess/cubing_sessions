/**

	 * Add-On for Cubing "Sessions Within Sessions"
	 * 
	 * Author: Adam Gradess
	 * Last Updated: 12/24/2021
	 * Description: Javascript to handle form input, sending data back
	 * to page
	 *
	 * Started: 8/19/2021
	 * During the end of the first month of the Tayrex internship.
	 * Four more score and seven five seconds of summer ago.
	 * 
	 * See main PHP file for more description
	 * 
	 * Notes: -----------------------------------------------------------------
		
		
 */

// Pressing enter intentionally does not work to enter a solve time
// **Only works if JQuery is included
$(document).on('keypress',function(e) {
    if(e.which == 13) { // Enter
 //       alert('You pressed enter!');
		return false;
    }
});

// 					***** Showing/hiding menus *****

// Showing settings menu
document.getElementById('settings_menu_button').addEventListener('click', function(event) {
	
	// alert('Settings menu clicked!'); // debug
	var settings_screen_grayout = document.getElementById('display_settings');
	var settings_screen = document.getElementById('display_settings_screen');	
	
	console.log(settings_screen_grayout.style.display);
	
	if (settings_screen_grayout.style.display != 'none') {
		settings_screen_grayout.style.display = 'none';
		settings_screen.style.display = 'none';
	} else {
		if (settings_screen_grayout.style.display == '' || settings_screen_grayout.style.display == 'none') {
		settings_screen_grayout.style.display = 'block';
		settings_screen.style.display = 'block';
		}
		// greys out page when settings are displayed
		// settings_screen.style.boxShadow = '0 0 0 99999px rgba(0, 0, 0, .6)';
	}
	
});

// Handing clicks when settings menu is open
document.getElementById('display_settings').addEventListener('click', function(event) {

	var settings_screen_grayout = document.getElementById('display_settings');
	var settings_screen = document.getElementById('display_settings_screen');	

	settings_screen_grayout.style.display = 'none';
	settings_screen.style.display = 'none';
});

document.getElementById('display_settings_screen').addEventListener('click', function(event) {

	var settings_screen_grayout = document.getElementById('display_settings');
	var settings_screen = document.getElementById('display_settings_screen');	

	settings_screen_grayout.style.display = 'block';
	settings_screen.style.display = 'block';
});

//							***** Settings Menu Functions *****

document.getElementById('toggle_ao5').addEventListener('click', function(event) {

	console.log('toggle_ao5 button clicked');
	var display_ao5 = document.getElementById('display_ao5');

	if (display_ao5.style.display == 'none') {
		display_ao5.style.display = 'inline';
	} else {
		console.log('toggle_ao5 currently shown');		
		display_ao5.style.display = 'none';
	}
});

document.getElementById('toggle_ao12').addEventListener('click', function(event) {

	console.log('toggle_ao12 button clicked');
	var display_ao12_a = document.getElementsByClassName('display_ao12');

	if (display_ao12_a[0].style.display == 'none') {
		for (html_elem in display_ao12_a) {
			html_elem.style.display = 'inline';			
		}
	} else {
		console.log('toggle_ao12 currently shown');		
		for (html_elem in display_ao12_a) {
			html_elem.style.display = 'none';			
		}
	}
});

document.getElementById('toggle_ao25').addEventListener('click', function(event) {

	console.log('toggle_ao25 button clicked');
	var display_ao25 = document.getElementById('display_ao25');

	if (display_ao25.style.display == 'none') {
		display_ao25.style.display = 'inline';
	} else {
		console.log('toggle_ao25 currently shown');		
		display_ao25.style.display = 'none';
	}
});

document.getElementById('toggle_ao50').addEventListener('click', function(event) {

	console.log('toggle_ao50 button clicked');
	var display_ao50 = document.getElementById('display_ao50');

	if (display_ao50.style.display == 'none') {
		display_ao50.style.display = 'inline';
	} else {
		console.log('toggle_ao50 currently shown');		
		display_ao50.style.display = 'none';
	}
});

document.getElementById('toggle_ao100').addEventListener('click', function(event) {

	console.log('toggle_ao100 button clicked');
	var display_ao100 = document.getElementById('display_ao100');

	if (display_ao100.style.display == 'none') {
		display_ao100.style.display = 'inline';
	} else {
		console.log('toggle_ao100 currently shown');		
		display_ao100.style.display = 'none';
	}
});


// 					***** Changing puzzle type (3x3, 2x2, ...) *****

document.getElementById('puzzle_select').addEventListener('change', function(event) {
	
	console.log('Puzzle changed.');
	var puzzle_select = document.getElementById('select_puzzle');
	var i_puzzle_type = puzzle_select.value;
	
/*	
	$.ajax({
  		method: "POST",
  		url: "cubing_sessions_addon.php?puzzle_type="+i_puzzle_type,
  		success: function(response_to_puzzle_change) {
  			console.log('Changed puzzle to '+i_puzzle_type);
  		},
	}); */
});

// AJAX BELOW DOES NOT WORK, USING A FORM OR SOME OTHER METHOD TO SEND SOLVE TIMES

// gets up to point where data is grabbed and logged to console, but
// POST data is not sent. Where does post request data go and does
// SameSite attribute have something to do with it?

/*


document.getElementById('solve_submission_form').addEventListener('submit', function(event) {
// 	event.preventDefault();
	
	var solve_submission_form = document.getElementById('solve_submission_form');
	var solveTime = solve_submission_form.elements[0].value;
	console.log('Solve time form elements: ', solve_submission_form.elements);
	console.log('Solve time: ', solve_submission_form.elements[0].value);
	
//	var data = {
//		"solve_time": solveTime,
//		"form_id": 30
//	};
	$.ajax({
  		method: "POST",
  		url: "cubing_sessions_addon.php?solve_time_ajax="+solveTime+"&form_id=30",
//  	data: data,
  		success: function(response_to_solve_time) {
  			console.log('Posted solve \"'+solveTime+'\" to the list...');
  		},
	});
	
});

*/