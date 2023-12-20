/**

	 * Add-On for Cubing "Sessions Within Sessions"
	 * 
	 * Author: Adam Gradess
	 * Last Updated: 1/9/2022
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


function gen_scramble(curr_puzzle) {
	
	const puzz_to_scram = {'3x3':'333','2x2':'222','4x4':'444','5x5':'555',
		'6x6':'666','7x7':'777','OH':'333','BLD':'333','FT':'333','Mega':'minx',
		'Pyra':'pyram','Skewb':'skewb','Sq-1':'sq1','Clock':'clock','4BLD':'444',
		'5BLD':'555','MBLD':'333'};
	// Specifying scramble lengths that would otherwise be too short or too long
	// according to scrambo.
	const scram_lens = {'222': 11,'444': 40,'555': 60,'666': 80,'777': 100};
	var curr_scram = puzz_to_scram[curr_puzzle];
	
	var scramble_display = document.getElementById('scramble_display');
	if (scram_lens[curr_scram] != null) {
		scramble_display.textContent = new Scrambo().type(curr_scram).length(scram_lens[curr_scram]).get()[0];
	} else {
		scramble_display.textContent = new Scrambo().type(curr_scram).get()[0];
	}
}

function js_display_1_session(session_num, curr_time_lst, session_end_idxs) {
	console.log(session_num);
	console.log(curr_time_lst);
	console.log(session_end_idxs);

	// hide everything and show p tag with id: session_#_stats
	session_stats_tags = document.getElementsByClassName('session_stats');
	console.log(session_stats_tags);
	for (var i = 0; i < session_stats_tags.length; i++) session_stats_tags[i].style.display = 'none';
	// for (session_stats in session_stats_tags) session_stats.style.display = 'none';
	session_stats_to_show = document.getElementById('session_' + session_num + '_stats');
	session_stats_to_show.style.display = 'block';

	// also set current session in the table to be selected, and all others not selected
	let session_td_list = document.querySelectorAll('#show_sessions_table td');
	for (var i = 0; i < session_td_list.length; i++) session_td_list[i].classList.remove('session_selected');
	session_td_list[session_num].classList.add('session_selected');
}

// Pressing enter intentionally does not work to enter a solve time
// **Only works if JQuery is included
$(document).on('keypress',function(e) {
    if(e.which == 13) { // Enter
 //       alert('You pressed enter!');
		return false;
    }
});

// 					***** Showing/hiding menus *****

// Toggling statistics and timer menus

var stats_menu = document.getElementById('stats_menu');
var timer_page = document.getElementById('timer');	

// Show stats menu
document.getElementById('stats_menu_button').addEventListener('click', function(event) {	
		
	if (stats_menu.style.display == 'none') {
		stats_menu.style.display = 'block';
		timer_page.style.display = 'none';
	}
	
});

// Show timer menu
document.getElementById('timer_page_button').addEventListener('click', function(event) {	
			
	if (timer_page.style.display == 'none') {
		timer_page.style.display = 'block';
		stats_menu.style.display = 'none';
	}
	
});

// Showing settings menu
document.getElementById('settings_menu_button').addEventListener('click', function(event) {	
	
	console.log('Settings menu clicked');
	var settings_screen_grayout = document.getElementById('display_settings');
	var settings_screen = document.getElementById('display_settings_screen');	
		
	if (settings_screen_grayout.style.display != 'none') {
		settings_screen_grayout.style.display = 'none';
		settings_screen.style.display = 'none';
	} else {
		if (settings_screen_grayout.style.display == '' || settings_screen_grayout.style.display == 'none') {
		settings_screen_grayout.style.display = 'block';
		settings_screen.style.display = 'block';
		}
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



//							***** Manually Adding Penalties *****

document.getElementById('two_s_penalty').addEventListener('click', function(event) {
	event.preventDefault();

	let solve_penalty = document.querySelector('[name="solve_penalty"]');
	solve_penalty.value = Number(solve_penalty.value) + 2;
	event.target.style.backgroundColor = "#0c5e55";
});

//							***** Settings Menu Functions [UNUSED] *****
/*
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
	var display_ao12 = document.getElementById('display_ao12');

	if (display_ao12.style.display == 'none') {
		display_ao12.style.display = 'inline';
	} else {
		console.log('toggle_ao12 currently shown');		
		display_ao12.style.display = 'none';
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
*/


// 					***** Changing puzzle type (3x3, 2x2, ...) *****
/*
document.getElementById('puzzle_select').addEventListener('change', function(event) {
	
	console.log('Puzzle changed.');
	var puzzle_select = document.getElementById('select_puzzle');
	var i_puzzle_type = puzzle_select.value;
	
	
	$.ajax({
  		method: "POST",
  		url: "cubing_sessions_addon.php?puzzle_type="+i_puzzle_type,
  		success: function(response_to_puzzle_change) {
  			console.log('Changed puzzle to '+i_puzzle_type);
  		},
	});
});
*/
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