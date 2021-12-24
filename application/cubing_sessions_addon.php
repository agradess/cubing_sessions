<?php
	/*
	 * Add-On for Cubing "Sessions Within Sessions"
	 * 
	 * Author: Adam Gradess
	 * Last Updated: 12/24/2021
	 * 
	 * Started: 6/29/2021
	 * During the end of the first month of the Tayrex internship.
	 * Four more score and seven five seconds of summer ago.
	 * 
	 * Making my own Rubik's Cube timer interface with PHP, JS, CSS.
	 * 
	 * Notes to self: -----------------------------------------------------------------
	 * 
	 * look into $_COOKIE, and difference between cookie and sessions
	 * 
	 * look into CSS grid layout
	 * 
	 * TODO: Research adding scramble with TNoodle
	 * TODO: Stop and start timer with spacebar, use jquery keyboard events
	 * Created separate program to test out spacebar timing
	 * 
	 */

    // manually remove warnings
    error_reporting(E_ALL & ~E_WARNING);

    //                      --- Functions ---

    // Averaging functions - return false if average cannot be computed:
    // Otherwise returns an integer or double with the average
    // $trim_amt: Total number of solves to trim, Ex: 2 for ao5
    // $avg_len: length of average, 5 for ao5
    // $end_index: last index of average
    // $curr_time_list: list to average from
    function trim_and_avg($trim_amt, $avg_len, $end_index, $curr_time_list) {
        // first check for any out of bounds parameters
        if ($end_index >= count($_SESSION[$curr_time_list]) || $end_index < 0) {
            return false;
        } else if ($end_index < $avg_len - 1) {
            return false;
        } else if ($avg_len > count($_SESSION[$curr_time_list])) {
            return false;
        } else {
            // grab subset of solve times array to avg and sort it
            
            // array_slice($input, $offset (starts at 0), length)
            $solve_list_subset_to_avg = array_slice($_SESSION[$curr_time_list], $end_index - $avg_len + 1, $avg_len);
            $solves_to_avg = array();
            foreach ($solve_list_subset_to_avg as $solve_key => $solve_val) {
                $solves_to_avg[] = $solve_val['solve']; // extract solve from attributes
            }
            sort($solves_to_avg); // no return value
            
            // trim off lowest and highest solves based on $trim_amt, assume even trim
            $count = $trim_amt / 2;
            while ($count > 0) {
                unset($solves_to_avg[0]);
                unset($solves_to_avg[count($solves_to_avg)]);
                
                $count--;
            }
            
            // average remaining times
            $solve_times_sum = 0;
            foreach ($solves_to_avg as $solve_time) {
                $solve_time_cast_float = (float)$solve_time;
                if ($solve_time_cast_float != 0) { // validation
                    $solve_times_sum += $solve_time_cast_float;
                }
            }
            
            $average_val_to_return = $solve_times_sum / ($avg_len - $trim_amt);
            return number_format((float)$average_val_to_return, 2, '.', ''); 
            // returns num as string in format: 1000.00
        }
    }
    
    // Use trim_and_avg to do average of 5, 12, 25, etc.
	
    
    session_start();
    
	if (!isset($_SESSION['visits'])) {
	    // Initialize variables for start of session
	    
	    // keeps track of page visits during session
	    $_SESSION['visits'] = 1;
	    // current puzzle times being displayed
	    $_SESSION['curr_puzzle'] = '3x3';
	    
	    // stores the list of solve times displayed on screen
	    // List structure:
	    /*
	     * [(1) => [solve => 3.45, timestamp => 23 Jul ...], (2) => [...], ...]
	     * 
	     */
	    $_SESSION['3x3_time_list'] = array();
	    $_SESSION['2x2_time_list'] = array();
	    $_SESSION['4x4_time_list'] = array();
	    $_SESSION['5x5_time_list'] = array();
	    $_SESSION['6x6_time_list'] = array();
	    $_SESSION['7x7_time_list'] = array();
	    $_SESSION['OH_time_list'] = array();
	    $_SESSION['BLD_time_list'] = array();
	    $_SESSION['FT_time_list'] = array();
	    $_SESSION['Mega_time_list'] = array();
	    $_SESSION['Pyra_time_list'] = array();
	    $_SESSION['Skewb_time_list'] = array();
	    $_SESSION['Sq-1_time_list'] = array();
	    $_SESSION['4BLD_time_list'] = array();
	    $_SESSION['5BLD_time_list'] = array();
	    $_SESSION['MBLD_time_list'] = array();
	    	    
	    // reset form/POST data at beginning of each session
	    unset($_POST);
	    // Keeps track of when the user submitted a solve, for updating 3x3_time_list
// 	    $_SESSION['is_solve_submitted'] = false;
	} else {
	    // Otherwise update variables for a new page visit
	    $_SESSION['visits']++;
	}
	
	// debug - manual reset
//     session_destroy();
	
	//                            --- Start of HTML ---
	
	echo '<!DOCTYPE html>';
	echo '<html>';
	
	echo '<head>';
	   echo '<title>PA Sponsored Rubik\'s Cube Timer (sike) | by Adam Gradess</title>';
	   echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>';
	   echo '<link href="http://fonts.cdnfonts.com/css/aller" rel="stylesheet">';
	   echo '<link rel="stylesheet" type="text/css" href="stylesheets/cubing_sessions_addon.css" />';
	echo '</head>';
	
	echo '<body>';
	
	// created overlay element for settings, see css overlay class
	
	echo '<div id="display_settings" class="overlay_background" style="display:none">';
	echo '</div>';
	
	echo '<div id="display_settings_screen" class="overlay_screen" style="display:none">';
	echo '<p>Settings</p>';
	
	echo '<p style="font-size:14px">Show/Hide Averages:</p>';
	echo '<span><button id="toggle_ao5">ao5</button></span>';
	echo '<br><span><button id="toggle_ao12">ao12</button></span>';
	echo '<br><span><button id="toggle_ao25">ao25</button></span>';
	echo '<br><span><button id="toggle_ao50">ao50</button></span>';
	echo '<br><span><button id="toggle_ao100">ao100</button></span>';
	
	echo '</div>';
	
	echo '<div id="header">';
    // find PA logo to put in the top left?
// 	if (isset($_SESSION['visits'])) echo $_SESSION['visits']; // debug
	
	echo '<span id="site_title">PA Cubing</span>';
    echo '<span class="menu_actions">Home</span>';
    echo '<span class="menu_actions">Timer</span>';
    echo '<span class="menu_actions">Statistics</span>';
//     echo '<span class="menu_actions"><button id="settings_menu_button">Settings</button></span>';
    echo '<span><button class="menu_actions" id="settings_menu_button">Settings</button></span>';
    echo '<span class="menu_actions"><a';
    echo '    href="https://www.webfx.com/blog/web-design/modern-web-design/">Web Design</a>';
    echo '</span>';
    
	echo '</div>';
	
	echo '<div id="timer">';
	
	echo '<div id="solve_table">';
	
	
	// Debugging with $_POST data
	
//     echo '<br>$_POST data: ';
// 	if (isset($_POST)) print_r($_POST); // debug print $_POST
//     echo '<br>';
// 	if (isset($_POST['puzzle_select'])) print_r($_POST['puzzle_select']); // debug print $_POST
//     echo 'Submit solve pressed: ' . isset($_POST['submit_solve']) . '<br>';
//     echo 'Submit puzzle pressed: ' . isset($_POST['submit_puzzle']) . '<br>';
    
    
	// Change puzzle type if user selected different puzzle
    if (isset($_POST['submit_puzzle']) && isset($_POST['puzzle_select'])) {
	    if ($_POST['puzzle_select'] != $_SESSION['curr_puzzle']) {
// 	    if (isset($_POST['submit_solve'])) {
            $_SESSION['curr_puzzle'] = $_POST['puzzle_select'];
	    }
	}
// 	echo '$_SESSION["curr_puzzle"]: ' . $_SESSION['curr_puzzle']; // debug
	
	// When confirm button pressed, add time to current puzzle time list
	
	// $curr_time_list_name = 3x3_time_list, 2x2_time_list, etc.
	$curr_time_list_name = $_SESSION['curr_puzzle'] . '_time_list';
// 	echo '<br>$curr_time_list_name: ' . $curr_time_list_name; // debug
// 	$solve_time_list_len = 1;
// 	if ($_SESSION[$curr_time_list_name]) $solve_time_list_len = count($_SESSION[$curr_time_list_name]);
	
	if (isset($_POST['submit_solve']) && isset($_POST['solve_time']) && $_POST['solve_time'] != '') {
// 	echo '<br>Valid time, can submit'; // debug
// 	       echo '<br>'; // debug
// 	       print_r($_SESSION[$curr_time_list_name]); // debug
	    if (isset($_SESSION[$curr_time_list_name])) {
	        $last_solve_idx = 0;
	        if (isset($_SESSION[$curr_time_list_name])) {
	            $last_solve_idx = count($_SESSION[$curr_time_list_name]) - 1;
	            if ($last_solve_idx == -1) $last_solve_idx++;
	        }
// 	        echo '<br>$last_solve_idx: ' . $last_solve_idx; // debug
// 	        echo '<br>$last solve: ' . $_SESSION[$curr_time_list_name][$last_solve_idx]['solve']; // debug
	    }
	    // If solve time stamp is the same, don't add new time
	    // Check solve time stamp against $_POST time stamp
// 	    echo '<br>Time stamp from last solve: '; // debug
// 	    echo $last_solve_timestamp; // debug
	    // 2nd condition used below for checking different timestamps:
	    // $_POST['solve_time_timestamp'] != $last_solve_timestamp
	    if (!isset($_SESSION[$curr_time_list_name]) || $_POST['solve_time'] != $_SESSION[$curr_time_list_name][$last_solve_idx]['solve']) {
// 	       echo '<br>Time added'; // debug
	       // When time is added, add solve time stamp, along with solve time
	       $_SESSION[$curr_time_list_name][] = array('solve' => $_POST['solve_time'],
	           'timestamp' => $_POST['solve_time_timestamp']);
	           // TODO: Fix for later: wrong time stamp, its for UTC
	    }
	}

	
    // Print out a table with the times, they should update as times are added
	// 2 rows, first row is solve #, second is the time list
	echo '<table id="display_solve_times">';
	
	echo '<thead>';
	echo '<tr>';
	
	echo '<td>';

    // change puzzle selection
    echo '<form method="post" id="select_puzzle_form">';
    echo 'Event: '.$_SESSION['curr_puzzle'].'<br>';
    echo '<select id="puzzle_select" name="puzzle_select">';
//     echo '<select id="puzzle_select" name="puzzle_select" value=\"'.$_SESSION['curr_puzzle'].'\">';
    echo '<option value="3x3">3x3</option>'; // 3x3
	echo '<option value="2x2">2x2</option>'; // 2x2
	echo '<option value="4x4">4x4</option>'; // 4x4
	echo '<option value="5x5">5x5</option>'; // 5x5
	echo '<option value="6x6">6x6</option>'; // 6x6
	echo '<option value="7x7">7x7</option>'; // 7x7
	echo '<option value="OH">OH</option>'; // OH
	echo '<option value="BLD">BLD</option>'; // BLD
	echo '<option value="FT">FT</option>'; // FT
	echo '<option value="Mega">Mega</option>'; // Mega
	echo '<option value="Pyra">Pyra</option>'; // Pyra
	echo '<option value="Skewb">Skewb</option>'; // Skewb
	echo '<option value="Sq-1">Sq-1</option>'; // Sq-1
	echo '<option value="4BLD">4BLD</option>'; // 4BLD
	echo '<option value="5BLD">5BLD</option>'; // 5BLD
	echo '<option value="MBLD">MBLD</option>'; // MBLD
	
	echo '</select>';                                        // date fmt: 24 Aug 2021 3:46 PM
	echo '<input type="hidden" name="solve_time_timestamp" value="'.date('d M Y h:i:s a').'">'; // hidden timestamp
	echo '<br><button type="submit" name="submit_puzzle">Change<br>Event</button>';
	echo '<form>';
	
// 	echo '<hr>';
//     echo '<b>#  |  Time</b>';
	
	echo '</td>';
	echo '</tr>';
	echo '</thead>';
	
	// Fill in the solve times table

	// If time list is empty, table body will not print
	if (isset($_SESSION[$curr_time_list_name])) { // changed
	    
	    echo '<tbody>';
	    // Print table with latest times at top
	    $solve_list_start_idx = count($_SESSION[$curr_time_list_name]) - 1; // changed
	    for ($solve_num = $solve_list_start_idx; $solve_num >= 0 ; $solve_num--) {
	        
	        echo '<tr>';
	        echo '<td>' . (int)$solve_num + 1 . '</td>';
	        echo '<td>' . $_SESSION[$curr_time_list_name][$solve_num]['solve'] . '</td>'; // changed
	        echo '</tr>';
	    }
	    echo '</tbody>';
	}
	
	echo '</table>';
	echo '</div>';
	
	echo '<div id="submit_times_container">';
	
	
	// Update times input field with session vars
	// NOT USED: take solve time w/ ajax method and post back to site
	// Used Instead: Form data, when submitted, returns $_POST data
	// however solve time comes back, update list
	echo '<form id="solve_submission_form" method="post">';	
	echo '<input type="text" name="solve_time" autocomplete="off" style="font-size:40px;text-align:center;background-color:#efefef;">';
	echo '<button type="submit" name="submit_solve" style="margin:auto;font-size:20px">Submit</button>';
	echo '</form>';
	
	
	// count($_SESSION['3x3_time_list']) - 1 // last trim_and_avg param for current avg
	
	echo '<div id="display_avgs">';

	echo '<span id="display_ao5" display="inline">ao5: ';
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(2, 5, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
	echo '</span><br><span id="display_ao12" display="inline">ao12: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(2, 12, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
	echo '</span><br><span id="display_ao25" style="display:none">ao25: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(4, 25, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
	echo '</span><br><span id="display_ao50" style="display:none">ao50: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(6, 50, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
	echo '</span><br><span id="display_ao100" style="display:none">ao100: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(10, 100, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);    
	echo '</span></div>';
	    
	// End of 'submit_times_container'
	echo '</div>';
	
	// End of 'timer', content of the page
	echo '</div>';
	
//                     -- Link Internal Scripts --
	
	echo '<script src="cubing_sessions_addon.js"></script>';
	echo '</body>';
	echo '</html>';

?>
<script>

</script>