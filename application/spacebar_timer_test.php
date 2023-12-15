<?php

echo '<!DOCTYPE html>';
echo '<html>';

echo '<head>';
echo '<title>PA Sponsored Rubik\'s Cube Timer Test | by Adam Gradess</title>';
echo '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>';
echo '<link href="http://fonts.cdnfonts.com/css/aller" rel="stylesheet">';
echo '<link rel="stylesheet" type="text/css" href="stylesheets/cubing_sessions_addon.css" />';
echo '</head>';

echo '<body style="{display:flex;align-items:center;justify-content:center;}">';

echo '<form id="solve_submission_form" method="post">';
echo '<div id="solve_time">0.00</div>';
// echo '<div id="solve_time_test" onClick=get_elapsed_time_string(408101)>0.00</div>';
echo '<button type="submit" name="submit_solve">Submit</button>';
echo '</form>';

echo '</body>';

echo '<script src="spacebar_timer_test.js"></script>';
echo '</html>';

?>