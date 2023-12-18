<?php

echo '<!DOCTYPE html>';
echo '<html>';

echo '<head>';
echo '<title>PA Sponsored Rubik\'s Cube Timer Test | by Adam Gradess</title>';
echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>';
echo '<link href="http://fonts.cdnfonts.com/css/aller" rel="stylesheet">';
echo '<link rel="stylesheet" type="text/css" href="stylesheets/cubing_sessions_addon.css" />';
echo '</head>';

echo '<body>';

echo '<form id="solve_submission_form" method="post" style="display:block;width:300px;height:300px;margin:200px">';
echo '<p>Wow, look, it is a working spacebar timer:</p>';
echo '<div id="solve_time">0.00</div>';
// echo '<div id="solve_time_test" onClick=get_elapsed_time_string(408101)>0.00</div>';
echo '<button type="submit" name="submit_solve">Submit</button>';
echo '<p>Last updated by Adam Gradess on Dec 17 2023.</p>';
echo '</form>';

echo '</body>';

echo '<script src="spacebar_timer_test.js"></script>';
echo '</html>';

?>