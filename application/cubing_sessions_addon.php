<?php
	/*
	 * Add-On for Cubing "Sessions Within Sessions"
	 * 
	 * Author: Adam Gradess
	 * Last Updated: 1/12/2021
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
	 * TODO: state (session state) for current timing method 'manual' or 'spacebar'
	 * TODO: put this state in settings
	 * TODO: be able to display different thing based on settings
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
    
	// Helper fxns: Use trim_and_avg to compute average of 5, 12, 25, etc.
	// $curr_time_list: NAME of the list, not the list itself
	
    function ao5($end_index, $curr_time_list) {
        return trim_and_avg(2, 5, $end_index, $curr_time_list);
	}
	
	function ao12($end_index, $curr_time_list) {
        return trim_and_avg(2, 12, $end_index, $curr_time_list);
    }
    
    // TODO: Depends on the event?
    // Determine the indexes at which sessions were ended
    // $solve_time_list: array
    // $max_time_diff: int, default - 30 min
    function find_session_idxs($solve_time_list, $max_time_diff = 30) {
        
        $session_idxs = array();
        
        // Error handling, if less than 3 solves return empty arr
		if (!isset($solve_time_list) || count($solve_time_list) <= 3) return array();
        
        // Iterate through array until 2nd to last solve
        for ($solve_num = 0; $solve_num < count($solve_time_list) - 1; $solve_num++) {
			
            $datetime_obj_2nd = date_create($solve_time_list[$solve_num + 1]['timestamp']);
            $datetime_obj_1st = date_create($solve_time_list[$solve_num]['timestamp']);
			// array containing time difference, lists day, month, yr, etc.
			$solve_time_diff_a = date_diff($datetime_obj_1st, $datetime_obj_2nd);
            // If two solves are greater than $max_time_diff apart,
            // denote this index i as the end of a session by
			// adding i to the return list
            if ($solve_time_diff_a->format('%i') > $max_time_diff) {
				$session_idxs[] = $solve_num;
            }
		}
		
		$session_idxs[] = count($solve_time_list) - 1;
		return $session_idxs;
	}

	// Calculates median, best single, best mo3, best ao5, best ao12
	// $curr_time_list: Name of the list, indexed into $_SESSION ('3x3_time_list')
	function session_stats($session_num, $solve_time_list, $session_end_idx_a) {
		
		$stats_a = array('b_mo3' => max($_SESSION[$solve_time_list])['solve'],
			'b_ao5' => max($_SESSION[$solve_time_list])['solve'], 'b_ao12' => max($_SESSION[$solve_time_list])['solve']);
		$session_start_idx = $session_num == 1 ? 0 : $session_end_idx_a[$session_num - 2];
		$session_end_idx = $session_end_idx_a[$session_num - 1];
		
		// $times_len = count($_SESSION[$solve_time_list]);
		$times_len = $session_end_idx - $session_start_idx;
		// single and median
		$stats_a['b_single'] = min(array_slice($_SESSION[$solve_time_list],$session_start_idx,$times_len))['solve'];
		$time_list_sorted = array_slice($_SESSION[$solve_time_list],$session_start_idx,$times_len);
		sort($time_list_sorted);
		$stats_a['median'] = $time_list_sorted[floor($times_len / 2) + 1]['solve'];

		// mo3, ao5, ao12
		for ($solve_idx = $session_start_idx; $solve_idx <= $session_end_idx; $solve_idx += 1) {
			if ($solve_idx > 2 + $session_start_idx) {
				$prev_3_solves = ($_SESSION[$solve_time_list][$solve_idx]['solve'] + $_SESSION[$solve_time_list][$solve_idx - 1]['solve'] + $_SESSION[$solve_time_list][$solve_idx - 2]['solve'])/3;
				$mo3 = number_format((float)$prev_3_solves, 2, '.', '');
				$stats_a['b_mo3'] = $mo3 < $stats_a['b_mo3'] ? $mo3 : $stats_a['b_mo3']; // mo3
			}
			if ($solve_idx > 4 + $session_start_idx) {
				$ao5 = ao5($solve_idx, $solve_time_list);
				$stats_a['b_ao5'] = $ao5 < $stats_a['b_ao5'] ? $ao5 : $stats_a['b_ao5']; // ao5
			}
			if ($solve_idx > 11 + $session_start_idx) {
				$ao12 = ao12($solve_idx, $solve_time_list);
				$stats_a['b_ao12'] = $ao12 < $stats_a['b_ao12'] ? $ao12 : $stats_a['b_ao12']; // ao12
			}
		}

		return $stats_a;
	}
	
	// Creates the statistics page
	// For the current puzzle:
	// For each session, list number of solves, date started 
	function show_sessions() {
		$curr_time_list = $_SESSION['curr_puzzle'] . '_time_list';
		$session_end_idx = find_session_idxs($_SESSION[$curr_time_list]);
		
		echo '<p style="font-size:40px">Statistics</p><hr>';
		echo '<p style="text-align:center">Sessions for '.$_SESSION['curr_puzzle'].'</p>';
		echo '<p style="text-align:center">Click on a session to view its stats.</p>';
		echo '<div id="show_sessions_cont"><table id="show_sessions_table"><tbody><tr>';

		$solve_idx = 0;
		$session_num = 1;
		// if ($_SESSION[$curr_time_list][0]['timestamp'] == null)
		// 	$session_start_date = date_create();
		// else
		$session_start_date = date_create($_SESSION[$curr_time_list][0]['timestamp']);
		$session_start_date = $session_start_date->format('M j, Y'); // Prints: Dec 7
		$curr_session_len = 0;
		$session_stats_a = array();

		while ($solve_idx < count($_SESSION[$curr_time_list])) {
			if (in_array($solve_idx, $session_end_idx)) {
				// Build table column and send individual session data once clicked
				$curr_session_len += 1;
				echo "<td onclick='session_stats(".$session_num.",".json_encode($_SESSION[$curr_time_list]).",".json_encode($session_end_idx).")'>";
				echo '<p>Session '.$session_num.'</p><p>' . $session_start_date.'</p>';
				echo '<p>' . $curr_session_len.($curr_session_len == 1 ? ' solve' : ' solves').'</p></td>';
				// Median, best single, best mo3, best ao5, best ao12
				$session_stats_a[] = session_stats($session_num, $curr_time_list, $session_end_idx);				

				echo '<script>
				function session_stats(session_num, curr_time_lst, session_end_idxs) {
				
					$.getScript("cubing_sessions_addon.js", function() {
						js_display_1_session(session_num - 1, curr_time_lst, session_end_idxs);
        			});

				}
				</script>';

				// reset/update counters
				if ($solve_idx < count($_SESSION[$curr_time_list])) {
					$session_num += 1;
					$curr_session_len = 0;
					$session_start_date = date_create($_SESSION[$curr_time_list][$solve_idx + 1]['timestamp']);
					$session_start_date = $session_start_date->format('M j, Y');	
				}
			} else {
				$curr_session_len += 1;
			}
			
			$solve_idx += 1;
		}

		echo '</tr></tbody></table>';
		echo '<div id="session_graph"></div>';
		$session_idx = 0;
		$worst_solve = max($_SESSION[$curr_time_list])['solve'];
		foreach ($session_stats_a as $session_stats) {
			echo '<p class="session_stats" id="session_'.$session_idx.'_stats" style="display:none">';
			echo 'Median: '.$session_stats['median'].'<br>';
			echo 'Best single: '.$session_stats['b_single'];
			if ($session_stats['b_mo3'] != $worst_solve) echo '<br>'.'Best mo3: '.$session_stats['b_mo3'];
			if ($session_stats['b_ao5'] != $worst_solve) echo '<br>'.'Best ao5: '.$session_stats['b_ao5'];
			if ($session_stats['b_ao12'] != $worst_solve) echo '<br>'.'Best ao12: '.$session_stats['b_ao12'];
			echo '</p>';
			$session_idx += 1;
		}
		echo '</div>'; // closing tag for 'show_sessions_cont'
	}
    
    
    //              ***** Initialize variables for start of session *****
	
	
	session_start();
    
    // Load times from local file
    $local_times_json = file_get_contents("./db/cubing_times.json");
    $local_times_a = json_decode($local_times_json, true);
    
    // If session hasn't started yet
	if (!isset($_SESSION['visits'])) {
	    
	    // keeps track of page visits during session
	    $_SESSION['visits'] = 1;
	    // current puzzle times being displayed
	    $_SESSION['curr_puzzle'] = '3x3';
		// current timing method (currently out of two: 'manual' and 'spacebar')
	    $_SESSION['curr_timing_method'] = 'manual';
	    // current avgs beig displayed, the value is the CSS 'display' value
	    $_SESSION['curr_ao5_display'] = 'inline';
	    $_SESSION['curr_ao12_display'] = 'inline';
	    $_SESSION['curr_ao25_display'] = 'none';
	    $_SESSION['curr_ao50_display'] = 'none';
	    $_SESSION['curr_ao100_display'] = 'none';
	    
	    // stores the list of solve times displayed on screen
	    // List structure:
	    /*
	     * [(1) => [solve => 3.45, timestamp => 23 Jul ...], (2) => [...], ...]
	     * 
	     */
	    	    	    
	    // For a new session, assign times db contents to session variables
	    $event_list = array('3x3','2x2','4x4','5x5','6x6','7x7','OH','BLD','FT','Mega','Pyra','Skewb','Sq-1','Clock','4BLD','5BLD','MBLD');
	    
	    foreach ($event_list as $event) {
	        $session_idx = $event . "_time_list";
	        if (!isset($local_times_a[$event])) {
	            $_SESSION[$session_idx] = array();
	        } else {
    	        $_SESSION[$session_idx] = $local_times_a[$event];
    	    }
	    }
	    
	    // reset form/POST data at beginning of each session
	    unset($_POST);
	    // Keeps track of when the user submitted a solve, for updating 3x3_time_list
// 	    $_SESSION['is_solve_submitted'] = false;
	} else {
	    // Otherwise update variables for a new page visit
	    $_SESSION['visits']++;
	}
	
	// debug - manual reset
    // session_destroy();
	
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
	// Content of settings tab
	echo '<p>Settings</p>';

	echo '<hr><p style="font-size:14px">Entering Times:</p>';

	echo '<span><form method="post">';
	echo '<select name="select_timing_method">';
	echo '<option value="manual">Manual</option>';
	echo '<option value="spacebar">Spacebar</option>';
	echo '</select>';
    echo '<button type="submit" id="toggle_timing_method">Change</button>';
    echo '</form></span>';

	echo '<hr><p style="font-size:14px">Show/Hide Averages:</p>';
	
	echo '<span><form method="post">';
	echo '<select name="select_ao5_disp">';
	echo '<option value="inline">Show</option>';
	echo '<option value="none">Hide</option>';
	echo '</select>';
    echo '<button type="submit" id="toggle_ao5">ao5</button>';
    echo '</form></span>';
    
    echo '<span><form method="post">';
    echo '<select name="select_ao12_disp">';
    echo '<option value="inline">Show</option>';
    echo '<option value="none">Hide</option>';
    echo '</select>';
    echo '<button type="submit" id="toggle_ao12">ao12</button>';
    echo '</form></span>';
    
    echo '<span><form method="post">';
    echo '<select name="select_ao25_disp">';
    echo '<option value="inline">Show</option>';
    echo '<option value="none">Hide</option>';
    echo '</select>';
    echo '<button type="submit" id="toggle_ao25">ao25</button>';
    echo '</form></span>';
    
    echo '<span><form method="post">';
    echo '<select name="select_ao50_disp">';
    echo '<option value="inline">Show</option>';
    echo '<option value="none">Hide</option>';
    echo '</select>';
    echo '<button type="submit" id="toggle_ao50">ao50</button>';
    echo '</form></span>';
    
    echo '<span><form method="post">';
    echo '<select name="select_ao100_disp">';
    echo '<option value="inline">Show</option>';
    echo '<option value="none">Hide</option>';
    echo '</select>';
    echo '<button type="submit" id="toggle_ao100">ao100</button>';
    echo '</form></span>';
    
	echo '</div>';
	
	echo '<div id="header">';
    // find PA logo to put in the top left?
// 	if (isset($_SESSION['visits'])) echo $_SESSION['visits']; // debug
	
	echo '<span id="site_title">PA Cubing</span>';
    echo '<span class="menu_actions">Home</span>';
    echo '<span><button class="menu_actions" id="timer_page_button">Timer</button></span>';
    echo '<span><button class="menu_actions" id="stats_menu_button">Statistics</button></span>';
//     echo '<span class="menu_actions"><button id="settings_menu_button">Settings</button></span>';
    echo '<span><button class="menu_actions" id="settings_menu_button">Settings</button></span>';
	// Web Design Link: (keeping for reference)
	// echo '<span class="menu_actions"><a';
    // echo '    href="https://www.webfx.com/blog/web-design/modern-web-design/">Web Design</a>';
    // echo '</span>';
    
	echo '</div>';

	
	//					***** Updating Puzzle Type and Entering New Solves *****
	
	// Debugging with $_POST data
	    // echo '<br>$_POST data: ';
		// if (isset($_POST)) print_r($_POST); // debug print $_POST
	    // echo '<br>'; 
    
	// Change puzzle type if user selected different puzzle
    if (isset($_POST['submit_puzzle']) && isset($_POST['puzzle_select'])) {
	    if ($_POST['puzzle_select'] != $_SESSION['curr_puzzle']) {
	// 	    if (isset($_POST['submit_solve'])) {
            $_SESSION['curr_puzzle'] = $_POST['puzzle_select'];
	    }
	}
	// 	echo '$_SESSION["curr_puzzle"]: ' . $_SESSION['curr_puzzle']; // debug
	
	// When confirm button pressed, add time to current puzzle time list
	
	$curr_time_list_name = $_SESSION['curr_puzzle'] . '_time_list'; // 3x3_time_list, 2x2_time_list, etc.
	// 	echo '<br>$curr_time_list_name: ' . $curr_time_list_name; // debug
	// 	$solve_time_list_len = 1;
	// 	if ($_SESSION[$curr_time_list_name]) $solve_time_list_len = count($_SESSION[$curr_time_list_name]);
	


	// TODO: add ability to submit with spacebar



	$submitted_not_empty = isset($_POST['submit_solve']) && isset($_POST['solve_time']) && $_POST['solve_time'] != '';
	if ($submitted_not_empty) {
		// accepts formats: x:xx.xx, xx.xx, x.xx
		if (preg_match('/[0-9]+:[0-9]{2}\.[0-9]|[0-9]{1,2}\.[0-9]/', $_POST['solve_time'])) {
		// 	    echo '<br>Valid time, can submit'; // debug
		// 	       echo '<br>'; // debug
		// 	       print_r($_SESSION[$curr_time_list_name]); // debug
			if (isset($_SESSION[$curr_time_list_name])) {
				$last_solve_idx = 0; // initializing
				if (isset($_SESSION[$curr_time_list_name])) {
					$last_solve_idx = count($_SESSION[$curr_time_list_name]) - 1;
					if ($last_solve_idx == -1) $last_solve_idx++;
				}
	// 	        echo '<br>$last_solve_idx: ' . $last_solve_idx; // debug
	// 	        echo '<br>$last solve: ' . $_SESSION[$curr_time_list_name][$last_solve_idx]['solve']; // debug
			}
			// If solve_time is the same as previous solve, don't add new time
			// Check solve time stamp against $_POST time stamp
	// 	    echo '<br>Time stamp from last solve: '; // debug
	// 	    echo $last_solve_timestamp; // debug
			// 2nd condition used below for checking against previous solve:
			if (!isset($_SESSION[$curr_time_list_name]) || $_POST['solve_time'] != $_SESSION[$curr_time_list_name][$last_solve_idx]['solve']) {
	// 	       echo '<br>Time added'; // debug
			// When time is added, add solve time stamp, along with solve time
			$_SESSION[$curr_time_list_name][] = array('solve' => $_POST['solve_time'],
				'timestamp' => $_POST['solve_time_timestamp']);
				// TODO: Fix for later: wrong time stamp, its for UTC
			
			// Update local storage file "cubing_times.json" 
			$local_times_a[$_SESSION['curr_puzzle']][] = array('solve' => $_POST['solve_time'],
				'timestamp' => $_POST['solve_time_timestamp']);
			$local_times_encoded = json_encode($local_times_a);
			file_put_contents("./db/cubing_times.json", $local_times_encoded);
			}
		}
	}

	// 						***** Menus/End of Header *****

	echo '<div id="stats_menu" style="display:none">';
	show_sessions();
	echo '</div>';
	
	echo '<div id="timer">';
	
	echo '<div id="solve_table">';
	
    // Print out a table with the times, they update as times are added
	// 2 rows, first row is solve #, second is the time list
	echo '<table id="display_solve_times">';
	
	echo '<thead>';
	echo '<tr>';
	
	echo '<td>';

    // change puzzle type
    echo '<form method="post" id="select_puzzle_form">';
    echo 'Event: '.$_SESSION['curr_puzzle'].'<br>';
    echo '<select id="puzzle_select" name="puzzle_select">';
//     echo '<select id="puzzle_select" name="puzzle_select" value=\"'.$_SESSION['curr_puzzle'].'\">';
    echo '<option value="3x3">3x3</option>';
	echo '<option value="2x2">2x2</option>';
	echo '<option value="4x4">4x4</option>';
	echo '<option value="5x5">5x5</option>';
	echo '<option value="6x6">6x6</option>';
	echo '<option value="7x7">7x7</option>';
	echo '<option value="OH">OH</option>';
	echo '<option value="BLD">BLD</option>';
	echo '<option value="FT">FT</option>';
	echo '<option value="Mega">Mega</option>';
	echo '<option value="Pyra">Pyra</option>';
	echo '<option value="Skewb">Skewb</option>';
	echo '<option value="Sq-1">Sq-1</option>';
	echo '<option value="Clock">Clock</option>';
	echo '<option value="4BLD">4BLD</option>';
	echo '<option value="5BLD">5BLD</option>';
	echo '<option value="MBLD">MBLD</option>';
	
	echo '</select>';                                        // date fmt: 24 Aug 2021 3:46 PM
	echo '<input type="hidden" name="solve_time_timestamp" value="'.date('d M Y h:i:s a').'">'; // hidden timestamp
	echo '<br><button type="submit" name="submit_puzzle">Change<br>Event</button>';
	echo '<form>';
	
	
	echo '</td>';
	echo '</tr>';
	echo '</thead>';
	
	// Fill in the solve times table

	// If time list is empty, table body will not print
	if (isset($_SESSION[$curr_time_list_name])) {
	    
		echo '<tbody>';
		echo '<tr><td></td><td>single</td><td>ao5</td><td>ao12</td></tr>';

	    // Print table with latest times at top
	    $solve_list_start_idx = count($_SESSION[$curr_time_list_name]) - 1;
	    for ($solve_num = $solve_list_start_idx; $solve_num >= 0; $solve_num--) {
	        
	        echo '<tr>';
	        echo '<td>' . (int)$solve_num + 1 . '</td>';
	        echo '<td>' . $_SESSION[$curr_time_list_name][$solve_num]['solve'] . '</td>';
	        echo '<td>' . ao5($solve_num, $curr_time_list_name) . '</td>';
	        echo '<td>' . ao12($solve_num, $curr_time_list_name) . '</td>';
	        echo '</tr>';
	    }
	    echo '</tbody>';
	}
	
	echo '</table>';
	echo '</div>';
	
	// END of solve table 
	
	echo '<div id="timer_main">';
	
	echo '<div id="scramble_display"></div>';
	
	echo '<div id="submit_times_container">';
		
	// Update times input field with session vars
	// NOT USED: take solve time w/ ajax method and post back to site
	// Used Instead: Form data, when submitted, returns $_POST data
	// however solve time comes back, update list
	echo '<form id="solve_submission_form" method="post">';

	// Update timing method (can change in settings)
	if (isset($_POST['select_timing_method']) && $_SESSION['curr_timing_method'] != $_POST['select_timing_method'])
	    $_SESSION['curr_timing_method'] = $_POST['select_timing_method'];
	
	if ($_SESSION['curr_timing_method'] == 'manual') {
		echo '<input type="text" name="solve_time" autocomplete="off" style="font-size:40px;text-align:center;background-color:#efefef;">';
	} else if ($_SESSION['curr_timing_method'] == 'spacebar') {
		echo '<div id="solve_time">0.00</div>';
		echo '<input type="hidden" name="solve_time" value="0.00">';
	}	
	echo '<br><button type="submit" name="submit_solve" style="margin:auto;font-size:20px">Submit</button>';
	
	echo '</form>';
	
	
	// Update averages display (can change in settings)
	if (isset($_POST['select_ao5_disp']) && $_SESSION['curr_ao5_display'] != $_POST['select_ao5_disp'])
	    $_SESSION['curr_ao5_display'] = $_POST['select_ao5_disp'];
    if (isset($_POST['select_ao12_disp']) && $_SESSION['curr_ao12_display'] != $_POST['select_ao12_disp'])
        $_SESSION['curr_ao12_display'] = $_POST['select_ao12_disp'];
    if (isset($_POST['select_ao25_disp']) && $_SESSION['curr_ao25_display'] != $_POST['select_ao25_disp'])
        $_SESSION['curr_ao25_display'] = $_POST['select_ao25_disp'];
    if (isset($_POST['select_ao50_disp']) && $_SESSION['curr_ao50_display'] != $_POST['select_ao50_disp'])
        $_SESSION['curr_ao50_display'] = $_POST['select_ao50_disp'];
    if (isset($_POST['select_ao100_disp']) && $_SESSION['curr_ao100_display'] != $_POST['select_ao100_disp'])
        $_SESSION['curr_ao100_display'] = $_POST['select_ao100_disp'];

	echo '<div id="display_avgs">';

	echo '<span id="display_ao5" style="display:'.$_SESSION['curr_ao5_display'].'">ao5: ';
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(2, 5, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
	echo '</span><span id="display_ao12" style="display:'.$_SESSION['curr_ao12_display'].'">ao12: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(2, 12, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
	echo '</span><span id="display_ao25" style="display:'.$_SESSION['curr_ao25_display'].'">ao25: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(4, 25, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
    echo '</span><span id="display_ao50" style="display:'.$_SESSION['curr_ao50_display'].'">ao50: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(6, 50, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);
    echo '</span><span id="display_ao100" style="display:'.$_SESSION['curr_ao100_display'].'">ao100: ';
	
	if (isset($_SESSION['3x3_time_list']))
	    echo trim_and_avg(10, 100, count($_SESSION[$curr_time_list_name]) - 1, $curr_time_list_name);
	    // 	    echo trim_and_avg(4, 25, 100);    
	echo '</span></div>';
	    
	// End of 'submit_times_container'
	echo '</div>';
	
	// End of 'timer_main', right side of the screen
	echo '</div>';

	// End of 'timer', content of the page
	echo '</div>';
	
//                          -- Internal Scripts --
	
	echo '<script src="./spacebar_timer.js"></script>';
	
	echo '<script src="../node_modules/scrambo/scrambo.js"></script>';
	echo '<script>';
	
	$get_scramble_script = "\$.getScript('cubing_sessions_addon.js', function() {
	   gen_scramble('".$_SESSION['curr_puzzle']."');
        });";
	
	echo $get_scramble_script;
	
	echo '</script>';
	
	echo '</body>';
	echo '</html>';

?>