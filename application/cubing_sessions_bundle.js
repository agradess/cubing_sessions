(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**

	 * Add-On for Cubing "Sessions Within Sessions"
	 * 
	 * Author: Adam Gradess
	 * Last Updated: 1/5/2022
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

const Scrambo = require('scrambo');
var curr_scramble = new Scrambo();

var scramble_display = document.getElementById('scramble_display');
scramble_display.textContent = curr_scramble.get()[0];


// console.log(curr_scramble.get()[0]);

//window.onload() = function() {
	// var scramble_display = document.getElementById('scramble_display');
	// scramble_display.innerHTML = curr_scramble;
	
//}

// Pressing enter intentionally does not work to enter a solve time
// **Only works if JQuery is included
$(document).on('keypress',function(e) {
    if(e.which == 13) { // Enter
 //       alert('You pressed enter!');
		return false;
    }
});

function solve_subm(curr_puzzle) {
	console.log(curr_puzzle);
}

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
},{"scrambo":8}],2:[function(require,module,exports){
/* jshint node: true */

var sequenceLength = 0;
var scrambler = function (size) {
  var sequence = [];
  var randomSource;

  function appendmoves(sequence, axsl, tl, la) {
    for (var sl = 0; sl < tl; sl++) {
      if (axsl[sl]) {
        var q = axsl[sl] - 1;
        var sa = la;
        var m = sl;
        if (sl + sl + 1 >= tl) {
          sa += 3;
          m = tl - 1 - m;
          q = 2 - q;
        }
        sequence[sequence.length] = (m * 6 + sa) * 4 + q;
      }
    }
  }

  function scramble() {
    var tl = size - 1;
    var axsl = [tl];
    var axam = [0,0,0];
    var la;
    var n = 0;
    la = -1;
    sequence[0] = [];
    for (var i = 0; i < tl; i++)
      axsl[i] = 0;
    axam[0] = axam[1] = axam[2] = 0;
    var moved = 0;
    while (sequence[0].length + moved < sequenceLength) {
      var ax, sl, q;
      do {
        do {
          ax = Math.floor(randomSource.random() * 3);
          sl = Math.floor(randomSource.random() * tl);
          q = Math.floor(randomSource.random() * 3);
        } while (ax === la && axsl[sl] !== 0);
      } while (ax === la);
      if (ax != la) {
        appendmoves(sequence[0], axsl, tl, la);
        for (i = 0; i < tl; i++)
          axsl[i] = 0;
        axam[0] = axam[1] = axam[2] = 0;
        moved = 0;
        la = ax;
      }
      axam[q]++;
      moved++;
      axsl[sl] = q + 1;
    }
    appendmoves(sequence[0], axsl, tl, la);
    sequence[0][sequence[0].length] = 0;
  }

  function scramblestring() {
    var scramble = '',
      j;
    for (var i = 0; i < sequence[0].length - 1; i++) {
      if (i !== 0)
        scramble += ' ';
      var k = sequence[0][i] >> 2;
      j = k % 6;
      k = (k - j) / 6;
      if (k) {
        scramble += 'dlburf'.charAt(j);
      } else {
        scramble += 'DLBURF'.charAt(j);
      }
      j = sequence[0][i] & 3;
      if (j !== 0)
        scramble += ' 2\''.charAt(j);
    }
    return scramble;
  }
  var setRandomSource = function (src) {
    randomSource = src;
  };
  var getRandomScramble = function () {
    scramble();
    return scramblestring(0);
  };
  var setScrambleLength = function (length) {
    sequenceLength = length;
  };
  return {
    initialize: setRandomSource,
    getRandomScramble: getRandomScramble,
    setScrambleLength: setScrambleLength
  };
};
module.exports['222'] = scrambler(2);
module.exports['333'] = scrambler(3);
module.exports['444'] = scrambler(4);
module.exports['555'] = scrambler(5);
module.exports['666'] = scrambler(6);
module.exports['777'] = scrambler(7);

},{}],3:[function(require,module,exports){
/* jshint node: true */

var scrambler = function () {
  function getRandomScramble() {
    var posit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var p = 'dU';
    var pegs = [0, 0, 0, 0];
    var seq = [];
    var i, j;
    for (i = 0; i < 14; i++) {
      seq[i] = Math.floor(randomSource.random() * 12) - 5;
    }
    var scrambleString = '';
    var turnToString = function (turn, amount) {
      var suffix;
      if (amount === 0) {
        return '';
      } else if (amount === 1) {
        suffix = '';
      } else if (amount === -1) {
        suffix = '\'';
      } else if (amount >= 0) {
        suffix = '' + amount + '';
      } else {
        suffix = '' + -amount + '\'';
      }
      return ' ' + turn + suffix;
    };
    var addToScrambleString = function (pegs, UAmount, dAmount) {
      scrambleString += '[' + pegs + ']' + turnToString('U', UAmount) + turnToString('d', dAmount) + ' ';
    };
    addToScrambleString('UU/dd', seq[0], seq[4]);
    addToScrambleString('dU/dU', seq[1], seq[5]);
    addToScrambleString('dd/UU', seq[2], seq[6]);
    addToScrambleString('Ud/Ud', seq[3], seq[7]);
    addToScrambleString('dU/UU', seq[8], 0);
    addToScrambleString('Ud/UU', seq[9], 0);
    addToScrambleString('UU/Ud', seq[10], 0);
    addToScrambleString('UU/dU', seq[11], 0);
    addToScrambleString('UU/UU', seq[12], 0);
    addToScrambleString('dd/dd', 0, seq[13]);
    addToScrambleString(p[pegs[0]] + p[pegs[1]] + '/' + p[pegs[2]] + p[pegs[3]], 0, 0);
    return scrambleString;
  }
  var randomSource;
  var setRandomSource = function (src) {
    randomSource = src;
  };
  return {
    initialize: setRandomSource,
    getRandomScramble: getRandomScramble,
    setScrambleLength: null
  };
}();
module.exports = scrambler;

},{}],4:[function(require,module,exports){
/* jshint node: true */
/*
 *
 * Program by Clément Gallet, based on earlier work by Jaap Scherphuis. Idea by Stefan Pochmann.
 *
 * ## Notation:
 * D means all layers below the U face together in one move.
 * R means all layers right from the L face together in one move.
 * ++ means 2/5 move clockwise (144 degrees), -- means 2/5 move counterclockwise (-144 degrees).
 * U is the regular move of the U face, according to standard cube notation.
 *
 */

var scrambler = function () {
  var linelen = 71;
  var randomSource;

  var permU = [4, 0, 1, 2, 3, 9, 5, 6, 7, 8, 10, 11, 12, 13, 58, 59, 16, 17, 18, 63, 20, 21, 22, 23, 24, 14, 15, 27, 28, 29, 19, 31, 32, 33, 34, 35, 25, 26, 38, 39, 40, 30, 42, 43, 44, 45, 46, 36, 37, 49, 50, 51, 41, 53, 54, 55, 56, 57, 47, 48, 60, 61, 62, 52, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131];
  var permUi = [1, 2, 3, 4, 0, 6, 7, 8, 9, 5, 10, 11, 12, 13, 25, 26, 16, 17, 18, 30, 20, 21, 22, 23, 24, 36, 37, 27, 28, 29, 41, 31, 32, 33, 34, 35, 47, 48, 38, 39, 40, 52, 42, 43, 44, 45, 46, 58, 59, 49, 50, 51, 63, 53, 54, 55, 56, 57, 14, 15, 60, 61, 62, 19, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131];
  var permD2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 33, 34, 35, 14, 15, 38, 39, 40, 19, 42, 43, 44, 45, 46, 25, 26, 49, 50, 51, 30, 53, 54, 55, 56, 57, 36, 37, 60, 61, 62, 41, 64, 65, 11, 12, 13, 47, 48, 16, 17, 18, 52, 20, 21, 22, 23, 24, 58, 59, 27, 28, 29, 63, 31, 32, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 124, 125, 121, 122, 123, 129, 130, 126, 127, 128, 131];
  var permD2i = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 44, 45, 46, 14, 15, 49, 50, 51, 19, 53, 54, 55, 56, 57, 25, 26, 60, 61, 62, 30, 64, 65, 11, 12, 13, 36, 37, 16, 17, 18, 41, 20, 21, 22, 23, 24, 47, 48, 27, 28, 29, 52, 31, 32, 33, 34, 35, 58, 59, 38, 39, 40, 63, 42, 43, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 123, 124, 125, 121, 122, 128, 129, 130, 126, 127, 131];
  var permR2 = [81, 77, 78, 3, 4, 86, 82, 83, 8, 85, 87, 122, 123, 124, 125, 121, 127, 128, 129, 130, 126, 131, 89, 90, 24, 25, 88, 94, 95, 29, 97, 93, 98, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 26, 22, 23, 48, 30, 31, 27, 28, 53, 32, 69, 70, 66, 67, 68, 74, 75, 71, 72, 73, 76, 101, 102, 103, 99, 100, 106, 107, 108, 104, 105, 109, 46, 47, 79, 80, 45, 51, 52, 84, 49, 50, 54, 0, 1, 2, 91, 92, 5, 6, 7, 96, 9, 10, 15, 11, 12, 13, 14, 20, 16, 17, 18, 19, 21, 113, 114, 110, 111, 112, 118, 119, 115, 116, 117, 120, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65];
  var permR2i = [88, 89, 90, 3, 4, 93, 94, 95, 8, 97, 98, 100, 101, 102, 103, 99, 105, 106, 107, 108, 104, 109, 46, 47, 24, 25, 45, 51, 52, 29, 49, 50, 54, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 81, 77, 78, 48, 85, 86, 82, 83, 53, 87, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 57, 58, 59, 55, 56, 62, 63, 64, 60, 61, 65, 1, 2, 79, 80, 0, 6, 7, 84, 9, 5, 10, 26, 22, 23, 91, 92, 31, 27, 28, 96, 30, 32, 69, 70, 66, 67, 68, 74, 75, 71, 72, 73, 76, 112, 113, 114, 110, 111, 117, 118, 119, 115, 116, 120, 15, 11, 12, 13, 14, 20, 16, 17, 18, 19, 21];

  function getRandomScramble() {
    var scramble = '';
    for (var i = 0; i < linelen - 1; i++) {
      var sequence = Math.floor(randomSource.random() * 2);
      if (i % 2) {
        if (sequence) {
          scramble += 'D++ ';
        } else {
          scramble += 'D-- ';
        }
      } else {
        if (sequence) {
          scramble += 'R++ ';
        } else {
          scramble += 'R-- ';
        }
      }
    }
    scramble += 'U\'';
    return scramble;
  }
  var setRandomSource = function (src) {
    randomSource = src;
  };
  var setScrambleLength = function (length) {
    linelen = length;
  };
  return {
    initialize: setRandomSource,
    getRandomScramble: getRandomScramble,
    setScrambleLength: setScrambleLength
  };
}();
module.exports = scrambler;

},{}],5:[function(require,module,exports){
/* jshint node: true */

/* Base script written by Jaap Scherphuis, jaapsch a t yahoo d o t com */
/* Javascript written by Syoji Takamatsu, , red_dragon a t honki d o t net */
/* Random-State modification by Lucas Garron (lucasg a t gmx d o t de / garron.us) in collaboration with Michael Gottlieb (mzrg.com)*/
/* Optimal modification by Michael Gottlieb (qqwref a t gmail d o t com) from Jaap's code */

var scrambler = function () {
  var seq = [];
  var scramblestring = '';

  function scramble() {
    var i, j, ls, t;
    initbrd();
    dosolve();
    scramblestring = '';
    for (i = 0; i < sol.length; i++) {
      scramblestring += ['U', 'L', 'R', 'B']
                           [sol[i] & 7] + ['', '\'']
                           [(sol[i] & 8) / 8] + ' ';
    }
    var tips = ['l', 'r', 'b', 'u'];
    for (i = 0; i < 4; i++) {
      j = Math.floor(randomSource.random() * 3);
      if (j < 2) {
        scramblestring += tips[i] + ['', '\''][j] + ' ';
      }
    }
  }
  var posit = [];
  var edt;
  var perm = [];
  var twst = [];
  var permmv = [];
  var twstmv = [];
  var sol = [];
  var pcperm = [];
  var pcori = [];

  function initbrd() {
    posit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3];
    sol.length = 0;
  }
  var edges = [2, 11, 1, 20, 4, 31, 10, 19, 13, 29, 22, 28];
  var movelist = [];
  movelist[0] = [0, 18, 9, 6, 24, 15, 1, 19, 11, 2, 20, 10]; //U
  movelist[1] = [23, 3, 30, 26, 7, 34, 22, 1, 31, 20, 4, 28]; //L
  movelist[2] = [5, 14, 32, 8, 17, 35, 4, 11, 29, 2, 13, 31]; //R
  movelist[3] = [12, 21, 27, 16, 25, 33, 13, 19, 28, 10, 22, 29]; //B
  function dosolve() {
    var a, b, c, l, t = 0,
      q = 0;
    var parity = 0;
    var temp;
    pcperm = [0, 1, 2, 3, 4, 5];
    for (var i = 0; i < 4; i++) {
      var other = i + Math.floor((6 - i) * randomSource.random());
      temp = pcperm[i];
      pcperm[i] = pcperm[other];
      pcperm[other] = temp;
      if (i !== other)
        parity++;
    }
    if (parity % 2 === 1) {
      temp = pcperm[4];
      pcperm[4] = pcperm[5];
      pcperm[5] = temp;
    }
    parity = 0;
    pcori = [];
    for (i = 0; i < 5; i++) {
      pcori[i] = Math.floor(2 * randomSource.random());
      parity += pcori[i];
    }
    pcori[5] = parity % 2;
    for (i = 6; i < 10; i++) {
      pcori[i] = Math.floor(3 * randomSource.random());
    }
    for (a = 0; a < 6; a++) {
      b = 0;
      for (c = 0; c < 6; c++) {
        if (pcperm[c] === a)
          break;
        if (pcperm[c] > a)
          b++;
      }
      q = q * (6 - a) + b;
    }
    for (a = 9; a >= 6; a--) {
      t = t * 3 + pcori[a];
    }
    for (a = 4; a >= 0; a--) {
      t = t * 2 + pcori[a];
    }
    if (q !== 0 || t !== 0) {
      for (l = 7; l < 12; l++) {
        if (search(q, t, l, -1))
          break;
      }
    }
  }

  function search(q, t, l, lm) {
    if (l === 0) {
      if (q === 0 && t === 0) {
        return true;
      }
    } else {
      if (perm[q] > l || twst[t] > l)
        return false;
      var p, s, a, m;
      for (m = 0; m < 4; m++) {
        if (m !== lm) {
          p = q;
          s = t;
          for (a = 0; a < 2; a++) {
            p = permmv[p][m];
            s = twstmv[s][m];
            sol[sol.length] = m + 8 * a;
            if (search(p, s, l - 1, m))
              return true;
            sol.length--;
          }
        }
      }
    }
    return false;
  }

  function calcperm() {
    var c, p, q, l, m, n;
    for (p = 0; p < 720; p++) {
      perm[p] = -1;
      permmv[p] = [];
      for (m = 0; m < 4; m++) {
        permmv[p][m] = getprmmv(p, m);
      }
    }
    perm[0] = 0;
    for (l = 0; l <= 6; l++) {
      n = 0;
      for (p = 0; p < 720; p++) {
        if (perm[p] === l) {
          for (m = 0; m < 4; m++) {
            q = p;
            for (c = 0; c < 2; c++) {
              q = permmv[q][m];
              if (perm[q] === -1) {
                perm[q] = l + 1;
                n++;
              }
            }
          }
        }
      }
    }
    for (p = 0; p < 2592; p++) {
      twst[p] = -1;
      twstmv[p] = [];
      for (m = 0; m < 4; m++) {
        twstmv[p][m] = gettwsmv(p, m);
      }
    }
    twst[0] = 0;
    for (l = 0; l <= 5; l++) {
      n = 0;
      for (p = 0; p < 2592; p++) {
        if (twst[p] === l) {
          for (m = 0; m < 4; m++) {
            q = p;
            for (c = 0; c < 2; c++) {
              q = twstmv[q][m];
              if (twst[q] === -1) {
                twst[q] = l + 1;
                n++;
              }
            }
          }
        }
      }
    }
  }

  function getprmmv(p, m) {
    var a, b, c;
    var ps = [];
    var q = p;
    for (a = 1; a <= 6; a++) {
      c = Math.floor(q / a);
      b = q - a * c;
      q = c;
      for (c = a - 1; c >= b; c--)
        ps[c + 1] = ps[c];
      ps[b] = 6 - a;
    }
    if (m === 0) {
      cycle3(ps, 0, 3, 1);
    } else if (m === 1) {
      cycle3(ps, 1, 5, 2);
    } else if (m === 2) {
      cycle3(ps, 0, 2, 4);
    } else if (m === 3) {
      cycle3(ps, 3, 4, 5);
    }
    q = 0;
    for (a = 0; a < 6; a++) {
      b = 0;
      for (c = 0; c < 6; c++) {
        if (ps[c] === a)
          break;
        if (ps[c] > a)
          b++;
      }
      q = q * (6 - a) + b;
    }
    return q;
  }

  function gettwsmv(p, m) {
    var a, b, c, d = 0;
    var ps = [];
    var q = p;
    for (a = 0; a <= 4; a++) {
      ps[a] = q & 1;
      q >>= 1;
      d ^= ps[a];
    }
    ps[5] = d;
    for (a = 6; a <= 9; a++) {
      c = Math.floor(q / 3);
      b = q - 3 * c;
      q = c;
      ps[a] = b;
    }
    if (m === 0) {
      ps[6]++;
      if (ps[6] === 3)
        ps[6] = 0;
      cycle3(ps, 0, 3, 1);
      ps[1] ^= 1;
      ps[3] ^= 1;
    } else if (m === 1) {
      ps[7]++;
      if (ps[7] === 3)
        ps[7] = 0;
      cycle3(ps, 1, 5, 2);
      ps[2] ^= 1;
      ps[5] ^= 1;
    } else if (m === 2) {
      ps[8]++;
      if (ps[8] === 3)
        ps[8] = 0;
      cycle3(ps, 0, 2, 4);
      ps[0] ^= 1;
      ps[2] ^= 1;
    } else if (m === 3) {
      ps[9]++;
      if (ps[9] === 3)
        ps[9] = 0;
      cycle3(ps, 3, 4, 5);
      ps[3] ^= 1;
      ps[4] ^= 1;
    }
    q = 0;
    for (a = 9; a >= 6; a--) {
      q = q * 3 + ps[a];
    }
    for (a = 4; a >= 0; a--) {
      q = q * 2 + ps[a];
    }
    return q;
  }

  function cycle3(arr, i1, i2, i3) {
    var c = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = arr[i3];
    arr[i3] = c;
  }
  var randomSource;
  var setRandomSource = function (src) {
    randomSource = src;
  };
  var getRandomScramble = function () {
    calcperm();
    scramble();
    return scramblestring;
  };
  var initializeFull = function (iniRandomSource) {
    setRandomSource(iniRandomSource);
  };
  var setScrambleLength = function (length) {
    return null;
  };
  return {
    initialize: setRandomSource,
    getRandomScramble: getRandomScramble,
    setScrambleLength: setScrambleLength
  };
}();
module.exports = scrambler;

},{}],6:[function(require,module,exports){
/*	Port by Caleb Hoover from Shuang Chen's skewb scrambler.
	Source: https://github.com/cubing/qqTimer/blob/mzrg/index.htm#L2158 
	Designed to work with Scrambo
*/

var scrambler = function() {
	var randomSource = Math;
	var setRandomSource = function(src) {
		randomSource = src;
	};
	var length = 11;
	var setScrambleLength = function(len) {
		length = len;
	};

	var initialize = function(iniRandomSource) {
		randomSource = iniRandomSource;
	}

	function getRandomScramble() {
		function t(e) {
			var t = arguments.length - 1,
				n = e[arguments[t]];
			for (var r = t; r > 1; r--) {
				e[arguments[r]] = e[arguments[r - 1]]
			}
			e[arguments[1]] = n
		}

		function n(e, t) {
			return e[t >> 3] >> ((t & 7) << 2) & 15
		}

		function r(e, t, n, r) {
			for (var i = 0; i < r; i++) {
				e[i] = [];
				for (var s = 0; s < t; s++) {
					e[i][s] = n(s, i)
				}
			}
		}

		function i(e, t, r, i, s, o, u) {
			var a = Array.isArray(s);
			for (var f = 0, l = r + 7 >>> 3; f < l; f++) {
				e[f] = -1
			}
			e[t >> 3] ^= 15 << ((t & 7) << 2);
			for (var c = 0; c <= i; c++) {
				var h = c + 1 ^ 15;
				for (var p = 0; p < r; p++) {
					if (n(e, p) == c) {
						for (var d = 0; d < o; d++) {
							var v = p;
							for (var m = 0; m < u; m++) {
								v = a ? s[d][v] : s(v, d);
								if (n(e, v) == 15) {
									e[v >> 3] ^= h << ((v & 7) << 2)
								}
							}
						}
					}
				}
			}
		}

		function s(e, t, r, i, o) {
			if (0 == r) return 0 == e && 0 == t;
			if (n(a, e) > r || n(f, t) > r) return !1;
			for (var u = 0; 4 > u; u++)
				if (u != i)
					for (var h = e, p = t, d = 0; 2 > d; d++)
						if (h = l[u][h], p = c[u][p], s(h, p, r - 1, u, o)) return o.push(u * 2 + (1 - d)), !0;
			return !1
		}

		function o(e, n) {
			var r = e % 12;
			e = ~~(e / 12);
			for (var i = [], s = 5517840, o = 0, u = 0; 5 > u; u++) {
				var a = h[5 - u],
					f = ~~(e / a),
					e = e - f * a,
					o = o ^ f,
					f = f << 2;
				i[u] = s >> f & 15;
				a = (1 << f) - 1;
				s = (s & a) + (s >> 4 & ~a)
			}
			0 == (o & 1) ? i[5] = s : (i[5] = i[4], i[4] = s);
			0 == n && t(i, 0, 3, 1);
			2 == n && t(i, 1, 5, 2);
			1 == n && t(i, 0, 2, 4);
			3 == n && t(i, 3, 4, 5);
			e = 0;
			s = 5517840;
			for (u = 0; 4 > u; u++) f = i[u] << 2, e *= 6 - u, e += s >> f & 15, s -= 1118480 << f;
			return e * 12 + p[r][n]
		}

		function u(e, t) {
			var n = [];
			var r = [];
			for (var i = 0; i < 4; i++) {
				n[i] = e % 3;
				e = ~~(e / 3)
			}
			for (var i = 0; i < 3; i++) {
				r[i] = e % 3;
				e = ~~(e / 3)
			}
			r[3] = (6 - r[0] - r[1] - r[2]) % 3;
			n[t] = (n[t] + 1) % 3;
			var s;
			if (t == 0) {
				var s = r[0];
				r[0] = r[2] + 2;
				r[2] = r[1] + 2;
				r[1] = s + 2
			} else if (t == 1) {
				var s = r[0];
				r[0] = r[1] + 2;
				r[1] = r[3] + 2;
				r[3] = s + 2
			} else if (t == 2) {
				var s = r[0];
				r[0] = r[3] + 2;
				r[3] = r[2] + 2;
				r[2] = s + 2
			} else if (t == 3) {
				var s = r[1];
				r[1] = r[2] + 2;
				r[2] = r[3] + 2;
				r[3] = s + 2
			}
			for (var i = 2; i >= 0; i--) {
				e = e * 3 + r[i] % 3
			}
			for (var i = 3; i >= 0; i--) {
				e = e * 3 + n[i]
			}
			return e
		}
		var a = [],
			f = [],
			l = [],
			c = [];
		var h = [1, 1, 1, 3, 12, 60, 360];
		var p = [
			[6, 5, 10, 1],
			[9, 7, 4, 2],
			[3, 11, 8, 0],
			[10, 1, 6, 5],
			[0, 8, 11, 3],
			[7, 9, 2, 4],
			[4, 2, 9, 7],
			[11, 3, 0, 8],
			[1, 10, 5, 6],
			[8, 0, 3, 11],
			[2, 4, 7, 9],
			[5, 6, 1, 10]
		];
		var d = [0, 1, 2, 0, 2, 1, 1, 2, 0, 2, 1, 0];
		var v, m, y = [];
		r(l, 4320, o, 4);
		i(a, 0, 4320, 7, l, 4, 2);
		r(c, 2187, u, 4);
		i(f, 0, 2187, 6, c, 4, 2);
		do {
			v = 0 | randomSource.random() * 4320;
			m = 0 | randomSource.random() * 2187
		} while (v == 0 && m == 0 || d[v % 12] != (m + ~~(m / 3) + ~~(m / 9) + ~~(m / 27)) % 3);
		for (; 99 > length && !s(v, m, length, -1, y); length++) {}

		var scramble = [];
		var w = ["L", "R", "B", "U"];
		for (var u = 0; u < y.length; u++) {
			var E = y[u] >> 1;
			var S = y[u] & 1;
			if (E == 2) {
				for (var l = 0; l <= S; l++) {
					var x = w[0];
					w[0] = w[1];
					w[1] = w[3];
					w[3] = x
				}
			}
			scramble.push(w[E] + (S == 1 ? "'" : ""))
		}
		return scramble.join(" ")
	}

	return {
		initialize: initialize,
		setRandomSource: setRandomSource,
		getRandomScramble: getRandomScramble.bind(11),
		setScrambleLength: setScrambleLength
	};
}();
module.exports = scrambler;
},{}],7:[function(require,module,exports){
/* jshint node: true */

var scrambler = function () {
  function FullCube_copy(obj, c) {
    obj.ul = c.ul;
    obj.ur = c.ur;
    obj.dl = c.dl;
    obj.dr = c.dr;
    obj.ml = c.ml;
  }

  function FullCube_doMove(obj, move) {
    var temp;
    move <<= 2;
    if (move > 24) {
      move = 48 - move;
      temp = obj.ul;
      obj.ul = (~~obj.ul >> move | obj.ur << 24 - move) & 16777215;
      obj.ur = (~~obj.ur >> move | temp << 24 - move) & 16777215;
    } else if (move > 0) {
      temp = obj.ul;
      obj.ul = (obj.ul << move | ~~obj.ur >> 24 - move) & 16777215;
      obj.ur = (obj.ur << move | ~~temp >> 24 - move) & 16777215;
    } else if (move === 0) {
      temp = obj.ur;
      obj.ur = obj.dl;
      obj.dl = temp;
      obj.ml = 1 - obj.ml;
    } else if (move >= -24) {
      move = -move;
      temp = obj.dl;
      obj.dl = (obj.dl << move | ~~obj.dr >> 24 - move) & 16777215;
      obj.dr = (obj.dr << move | ~~temp >> 24 - move) & 16777215;
    } else if (move < -24) {
      move = 48 + move;
      temp = obj.dl;
      obj.dl = (~~obj.dl >> move | obj.dr << 24 - move) & 16777215;
      obj.dr = (~~obj.dr >> move | temp << 24 - move) & 16777215;
    }
  }

  function FullCube_getParity(obj) {
    var a, b, cnt, i, p;
    cnt = 0;
    obj.arr[0] = FullCube_pieceAt(obj, 0);
    for (i = 1; i < 24; ++i) {
      FullCube_pieceAt(obj, i) !== obj.arr[cnt] && (obj.arr[++cnt] = FullCube_pieceAt(obj, i));
    }
    p = 0;
    for (a = 0; a < 16; ++a) {
      for (b = a + 1; b < 16; ++b) {
        obj.arr[a] > obj.arr[b] && (p ^= 1);
      }
    }
    return p;
  }

  function FullCube_getShapeIdx(obj) {
    var dlx, drx, ulx, urx;
    urx = obj.ur & 1118481;
    urx |= ~~urx >> 3;
    urx |= ~~urx >> 6;
    urx = urx & 15 | ~~urx >> 12 & 48;
    ulx = obj.ul & 1118481;
    ulx |= ~~ulx >> 3;
    ulx |= ~~ulx >> 6;
    ulx = ulx & 15 | ~~ulx >> 12 & 48;
    drx = obj.dr & 1118481;
    drx |= ~~drx >> 3;
    drx |= ~~drx >> 6;
    drx = drx & 15 | ~~drx >> 12 & 48;
    dlx = obj.dl & 1118481;
    dlx |= ~~dlx >> 3;
    dlx |= ~~dlx >> 6;
    dlx = dlx & 15 | ~~dlx >> 12 & 48;
    return Shape_getShape2Idx(FullCube_getParity(obj) << 24 | ulx << 18 | urx << 12 | dlx << 6 | drx);
  }

  function FullCube_getSquare(obj, sq) {
    var a, b;
    for (a = 0; a < 8; ++a) {
      obj.prm[a] = ~~ (~~FullCube_pieceAt(obj, a * 3 + 1) >> 1 << 24) >> 24;
    }
    sq.cornperm = get8Perm(obj.prm);
    sq.topEdgeFirst = FullCube_pieceAt(obj, 0) === FullCube_pieceAt(obj, 1);
    a = sq.topEdgeFirst ? 2 : 0;
    for (b = 0; b < 4; a += 3, ++b)
      obj.prm[b] = ~~ (~~FullCube_pieceAt(obj, a) >> 1 << 24) >> 24;
    sq.botEdgeFirst = FullCube_pieceAt(obj, 12) === FullCube_pieceAt(obj, 13);
    a = sq.botEdgeFirst ? 14 : 12;
    for (; b < 8; a += 3, ++b)
      obj.prm[b] = ~~ (~~FullCube_pieceAt(obj, a) >> 1 << 24) >> 24;
    sq.edgeperm = get8Perm(obj.prm);
    sq.ml = obj.ml;
  }

  function FullCube_pieceAt(obj, idx) {
    var ret;
    idx < 6 ? ret = ~~obj.ul >> (5 - idx << 2) : idx < 12 ? ret = ~~obj.ur >> (11 - idx << 2) : idx < 18 ? ret = ~~obj.dl >> (17 - idx << 2) : ret = ~~obj.dr >> (23 - idx << 2);
    return~~ ((ret & 15) << 24) >> 24;
  }

  function FullCube_setPiece(obj, idx, value) {
    if (idx < 6) {
      obj.ul &= ~(15 << (5 - idx << 2));
      obj.ul |= value << (5 - idx << 2);
    } else if (idx < 12) {
      obj.ur &= ~(15 << (11 - idx << 2));
      obj.ur |= value << (11 - idx << 2);
    } else if (idx < 18) {
      obj.dl &= ~(15 << (17 - idx << 2));
      obj.dl |= value << (17 - idx << 2);
    } else {
      obj.dr &= ~(15 << (23 - idx << 2));
      obj.dr |= value << (23 - idx << 2);
    }
  }

  function FullCube_FullCube__Ljava_lang_String_2V() {
    this.arr = [];
    this.prm = [];
  }

  function FullCube_randomCube() {
    var f, i, shape, edge, corner, n_edge, n_corner, rnd, m;
    f = new FullCube_FullCube__Ljava_lang_String_2V();
    shape = Shape_ShapeIdx[~~(square1SolverRandomSource.random() * 3678)];
    corner = 19088743 << 1 | 286331153;
    edge = 19088743 << 1;
    n_corner = n_edge = 8;
    for (i = 0; i < 24; i++) {
      if ((shape >> i & 1) === 0) {
        rnd = ~~ (square1SolverRandomSource.random() * n_edge) << 2;
        FullCube_setPiece(f, 23 - i, edge >> rnd & 15);
        m = (1 << rnd) - 1;
        edge = (edge & m) + (edge >> 4 & ~m);
        --n_edge;
      } else {
        rnd = ~~ (square1SolverRandomSource.random() * n_corner) << 2;
        FullCube_setPiece(f, 23 - i, corner >> rnd & 15);
        FullCube_setPiece(f, 22 - i, corner >> rnd & 15);
        m = (1 << rnd) - 1;
        corner = (corner & m) + (corner >> 4 & ~m);
        --n_corner;
        ++i;
      }
    }
    f.ml = ~~ (square1SolverRandomSource.random() * 2);
    return f;
  }

  var FullCube_gen;

  function Search_init2(obj) {
    var corner, edge, i, j, ml, prun;
    FullCube_copy(obj.Search_d, obj.Search_c);
    for (i = 0; i < obj.Search_length1; ++i) {
      FullCube_doMove(obj.Search_d, obj.Search_move[i]);
    }
    FullCube_getSquare(obj.Search_d, obj.Search_sq);
    edge = obj.Search_sq.edgeperm;
    corner = obj.Search_sq.cornperm;
    ml = obj.Search_sq.ml;
    prun = Math.max(SquarePrun[obj.Search_sq.edgeperm << 1 | ml], SquarePrun[obj.Search_sq.cornperm << 1 | ml]);
    for (i = prun; i < obj.Search_maxlen2; ++i) {
      if (Search_phase2(obj, edge, corner, obj.Search_sq.topEdgeFirst, obj.Search_sq.botEdgeFirst, ml, i, obj.Search_length1, 0)) {
        for (j = 0; j < i; ++j) {
          FullCube_doMove(obj.Search_d, obj.Search_move[obj.Search_length1 + j]);
        }
        obj.Search_sol_string = Search_move2string(obj, i + obj.Search_length1);
        return true;
      }
    }
    return false;
  }

  function Search_move2string(obj, len) {
    var s = '';
    var top = 0,
      bottom = 0;
    for (var i = len - 1; i >= 0; i--) {
      var val = obj.Search_move[i];
      if (val > 0) {
        val = 12 - val;
        top = val > 6 ? val - 12 : val;
      } else if (val < 0) {
        val = 12 + val;
        bottom = val > 6 ? val - 12 : val;
      } else {
        if (top === 0 && bottom === 0) {
          s += ' / ';
        } else {
          s += '(' + top + ', ' + bottom + ') / ';
        }
        top = bottom = 0;
      }
    }
    if (top === 0 && bottom === 0) {} else {
      s += '(' + top + ', ' + bottom + ')';
    }
    return s;
  }

  function Search_phase1(obj, shape, prunvalue, maxl, depth, lm) {
    var m, prunx, shapex;
    if (prunvalue === 0 && maxl < 4) {
      return maxl === 0 && Search_init2(obj);
    }
    if (lm !== 0) {
      shapex = Shape_TwistMove[shape];
      prunx = ShapePrun[shapex];
      if (prunx < maxl) {
        obj.Search_move[depth] = 0;
        if (Search_phase1(obj, shapex, prunx, maxl - 1, depth + 1, 0)) {
          return true;
        }
      }
    }
    shapex = shape;
    if (lm <= 0) {
      m = 0;
      while (true) {
        m += Shape_TopMove[shapex];
        shapex = ~~m >> 4;
        m &= 15;
        if (m >= 12) {
          break;
        }
        prunx = ShapePrun[shapex];
        if (prunx > maxl) {
          break;
        } else if (prunx < maxl) {
          obj.Search_move[depth] = m;
          if (Search_phase1(obj, shapex, prunx, maxl - 1, depth + 1, 1)) {
            return true;
          }
        }
      }
    }
    shapex = shape;
    if (lm <= 1) {
      m = 0;
      while (true) {
        m += Shape_BottomMove[shapex];
        shapex = ~~m >> 4;
        m &= 15;
        if (m >= 6) {
          break;
        }
        prunx = ShapePrun[shapex];
        if (prunx > maxl) {
          break;
        } else if (prunx < maxl) {
          obj.Search_move[depth] = -m;
          if (Search_phase1(obj, shapex, prunx, maxl - 1, depth + 1, 2)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function Search_phase2(obj, edge, corner, topEdgeFirst, botEdgeFirst, ml, maxl, depth, lm) {
    var botEdgeFirstx, cornerx, edgex, m, prun1, prun2, topEdgeFirstx;
    if (maxl === 0 && !topEdgeFirst && botEdgeFirst) {
      return true;
    }
    if (lm !== 0 && topEdgeFirst === botEdgeFirst) {
      edgex = Square_TwistMove[edge];
      cornerx = Square_TwistMove[corner];
      if (SquarePrun[edgex << 1 | 1 - ml] < maxl && SquarePrun[cornerx << 1 | 1 - ml] < maxl) {
        obj.Search_move[depth] = 0;
        if (Search_phase2(obj, edgex, cornerx, topEdgeFirst, botEdgeFirst, 1 - ml, maxl - 1, depth + 1, 0)) {
          return true;
        }
      }
    }
    if (lm <= 0) {
      topEdgeFirstx = !topEdgeFirst;
      edgex = topEdgeFirstx ? Square_TopMove[edge] : edge;
      cornerx = topEdgeFirstx ? corner : Square_TopMove[corner];
      m = topEdgeFirstx ? 1 : 2;
      prun1 = SquarePrun[edgex << 1 | ml];
      prun2 = SquarePrun[cornerx << 1 | ml];
      while (m < 12 && prun1 <= maxl && prun1 <= maxl) {
        if (prun1 < maxl && prun2 < maxl) {
          obj.Search_move[depth] = m;
          if (Search_phase2(obj, edgex, cornerx, topEdgeFirstx, botEdgeFirst, ml, maxl - 1, depth + 1, 1)) {
            return true;
          }
        }
        topEdgeFirstx = !topEdgeFirstx;
        if (topEdgeFirstx) {
          edgex = Square_TopMove[edgex];
          prun1 = SquarePrun[edgex << 1 | ml];
          m += 1;
        } else {
          cornerx = Square_TopMove[cornerx];
          prun2 = SquarePrun[cornerx << 1 | ml];
          m += 2;
        }
      }
    }
    if (lm <= 1) {
      botEdgeFirstx = !botEdgeFirst;
      edgex = botEdgeFirstx ? Square_BottomMove[edge] : edge;
      cornerx = botEdgeFirstx ? corner : Square_BottomMove[corner];
      m = botEdgeFirstx ? 1 : 2;
      prun1 = SquarePrun[edgex << 1 | ml];
      prun2 = SquarePrun[cornerx << 1 | ml];
      while (m < (maxl > 3 ? 6 : 12) && prun1 <= maxl && prun1 <= maxl) {
        if (prun1 < maxl && prun2 < maxl) {
          obj.Search_move[depth] = -m;
          if (Search_phase2(obj, edgex, cornerx, topEdgeFirst, botEdgeFirstx, ml, maxl - 1, depth + 1, 2)) {
            return true;
          }
        }
        botEdgeFirstx = !botEdgeFirstx;
        if (botEdgeFirstx) {
          edgex = Square_BottomMove[edgex];
          prun1 = SquarePrun[edgex << 1 | ml];
          m += 1;
        } else {
          cornerx = Square_BottomMove[cornerx];
          prun2 = SquarePrun[cornerx << 1 | ml];
          m += 2;
        }
      }
    }
    return false;
  }

  function Search_solution(obj, c) {
    var shape;
    obj.Search_c = c;
    shape = FullCube_getShapeIdx(c);
    for (obj.Search_length1 = ShapePrun[shape]; obj.Search_length1 < 100; ++obj.Search_length1) {
      obj.Search_maxlen2 = Math.min(31 - obj.Search_length1, 17);
      if (Search_phase1(obj, shape, ShapePrun[shape], obj.Search_length1, 0, -1)) {
        break;
      }
    }
    return obj.Search_sol_string;
  }

  function Search_Search() {
    this.Search_move = [];
    this.Search_d = new FullCube_FullCube__Ljava_lang_String_2V();
    this.Search_sq = new Square_Square();
  }

  function Shape_$clinit() {
    Shape_halflayer = [
            0,
            3,
            6,
            12,
            15,
            24,
            27,
            30,
            48,
            51,
            54,
            60,
            63
        ];
    Shape_ShapeIdx = [];
    ShapePrun = [];
    Shape_TopMove = [];
    Shape_BottomMove = [];
    Shape_TwistMove = [];
    Shape_init();
  }

  function Shape_bottomMove(obj) {
    var move, moveParity;
    move = 0;
    moveParity = 0;
    do {
      if ((obj.bottom & 2048) === 0) {
        move += 1;
        obj.bottom = obj.bottom << 1;
      } else {
        move += 2;
        obj.bottom = obj.bottom << 2 ^ 12291;
      }
      moveParity = 1 - moveParity;
    } while ((bitCount(obj.bottom & 63) & 1) !== 0);
    (bitCount(obj.bottom) & 2) === 0 && (obj.Shape_parity ^= moveParity);
    return move;
  }

  function Shape_getIdx(obj) {
    var ret;
    ret = binarySearch(Shape_ShapeIdx, obj.top << 12 | obj.bottom) << 1 | obj.Shape_parity;
    return ret;
  }

  function Shape_setIdx(obj, idx) {
    obj.Shape_parity = idx & 1;
    obj.top = Shape_ShapeIdx[~~idx >> 1];
    obj.bottom = obj.top & 4095;
    obj.top >>= 12;
  }

  function Shape_topMove(obj) {
    var move, moveParity;
    move = 0;
    moveParity = 0;
    do {
      if ((obj.top & 2048) === 0) {
        move += 1;
        obj.top = obj.top << 1;
      } else {
        move += 2;
        obj.top = obj.top << 2 ^ 12291;
      }
      moveParity = 1 - moveParity;
    } while ((bitCount(obj.top & 63) & 1) !== 0);
    (bitCount(obj.top) & 2) === 0 && (obj.Shape_parity ^= moveParity);
    return move;
  }

  function Shape_Shape() {}

  function Shape_getShape2Idx(shp) {
    var ret;
    ret = binarySearch(Shape_ShapeIdx, shp & 16777215) << 1 | ~~shp >> 24;
    return ret;
  }

  function Shape_init() {
    var count, depth, dl, done, done0, dr, i, idx, m, s, ul, ur, value, p1, p3, temp;
    count = 0;
    for (i = 0; i < 28561; ++i) {
      dr = Shape_halflayer[i % 13];
      dl = Shape_halflayer[~~(i / 13) % 13];
      ur = Shape_halflayer[~~(~~(i / 13) / 13) % 13];
      ul = Shape_halflayer[~~(~~(~~(i / 13) / 13) / 13)];
      value = ul << 18 | ur << 12 | dl << 6 | dr;
      bitCount(value) === 16 && (Shape_ShapeIdx[count++] = value);
    }
    s = new Shape_Shape();
    for (i = 0; i < 7356; ++i) {
      Shape_setIdx(s, i);
      Shape_TopMove[i] = Shape_topMove(s);
      Shape_TopMove[i] |= Shape_getIdx(s) << 4;
      Shape_setIdx(s, i);
      Shape_BottomMove[i] = Shape_bottomMove(s);
      Shape_BottomMove[i] |= Shape_getIdx(s) << 4;
      Shape_setIdx(s, i);
      temp = s.top & 63;
      p1 = bitCount(temp);
      p3 = bitCount(s.bottom & 4032);
      s.Shape_parity ^= 1 & ~~(p1 & p3) >> 1;
      s.top = s.top & 4032 | ~~s.bottom >> 6 & 63;
      s.bottom = s.bottom & 63 | temp << 6;
      Shape_TwistMove[i] = Shape_getIdx(s);
    }
    for (i = 0; i < 7536; ++i) {
      ShapePrun[i] = -1;
    }
    ShapePrun[Shape_getShape2Idx(14378715)] = 0;
    ShapePrun[Shape_getShape2Idx(31157686)] = 0;
    ShapePrun[Shape_getShape2Idx(23967451)] = 0;
    ShapePrun[Shape_getShape2Idx(7191990)] = 0;
    done = 4;
    done0 = 0;
    depth = -1;
    while (done !== done0) {
      done0 = done;
      ++depth;
      for (i = 0; i < 7536; ++i) {
        if (ShapePrun[i] === depth) {
          m = 0;
          idx = i;
          do {
            idx = Shape_TopMove[idx];
            m += idx & 15;
            idx >>= 4;
            if (ShapePrun[idx] === -1) {
              ++done;
              ShapePrun[idx] = depth + 1;
            }
          } while (m !== 12);
          m = 0;
          idx = i;
          do {
            idx = Shape_BottomMove[idx];
            m += idx & 15;
            idx >>= 4;
            if (ShapePrun[idx] === -1) {
              ++done;
              ShapePrun[idx] = depth + 1;
            }
          } while (m !== 12);
          idx = Shape_TwistMove[i];
          if (ShapePrun[idx] === -1) {
            ++done;
            ShapePrun[idx] = depth + 1;
          }
        }
      }
    }
  }

  var Shape_BottomMove, Shape_ShapeIdx, ShapePrun, Shape_TopMove, Shape_TwistMove, Shape_halflayer;

  function Square_$clinit() {
    SquarePrun = [];
    Square_TwistMove = [];
    Square_TopMove = [];
    Square_BottomMove = [];
    fact = [
            1,
            1,
            2,
            6,
            24,
            120,
            720,
            5040
        ];
    Cnk = [];
    for (var i = 0; i < 12; ++i)
      Cnk[i] = [];
    Square_init();
  }

  function Square_Square() {}

  function get8Perm(arr) {
    var i, idx, v, val;
    idx = 0;
    val = 1985229328;
    for (i = 0; i < 7; ++i) {
      v = arr[i] << 2;
      idx = (8 - i) * idx + (~~val >> v & 7);
      val -= 286331152 << v;
    }
    return idx & 65535;
  }

  function Square_init() {
    var check, depth, done, find, i, idx, idxx, inv, j, m, ml, pos, temp;
    for (i = 0; i < 12; ++i) {
      Cnk[i][0] = 1;
      Cnk[i][i] = 1;
      for (j = 1; j < i; ++j) {
        Cnk[i][j] = Cnk[i - 1][j - 1] + Cnk[i - 1][j];
      }
    }
    pos = [];
    for (i = 0; i < 40320; ++i) {
      set8Perm(pos, i);
      temp = pos[2];
      pos[2] = pos[4];
      pos[4] = temp;
      temp = pos[3];
      pos[3] = pos[5];
      pos[5] = temp;
      Square_TwistMove[i] = get8Perm(pos);
      set8Perm(pos, i);
      temp = pos[0];
      pos[0] = pos[1];
      pos[1] = pos[2];
      pos[2] = pos[3];
      pos[3] = temp;
      Square_TopMove[i] = get8Perm(pos);
      set8Perm(pos, i);
      temp = pos[4];
      pos[4] = pos[5];
      pos[5] = pos[6];
      pos[6] = pos[7];
      pos[7] = temp;
      Square_BottomMove[i] = get8Perm(pos);
    }
    for (i = 0; i < 80640; ++i) {
      SquarePrun[i] = -1;
    }
    SquarePrun[0] = 0;
    depth = 0;
    done = 1;
    while (done < 80640) {
      inv = depth >= 11;
      find = inv ? -1 : depth;
      check = inv ? depth : -1;
      ++depth;
      OUT: for (i = 0; i < 80640; ++i) {
        if (SquarePrun[i] === find) {
          idx = ~~i >> 1;
          ml = i & 1;
          idxx = Square_TwistMove[idx] << 1 | 1 - ml;
          if (SquarePrun[idxx] === check) {
            ++done;
            SquarePrun[inv ? i : idxx] = ~~ (depth << 24) >> 24;
            if (inv)
              continue OUT;
          }
          idxx = idx;
          for (m = 0; m < 4; ++m) {
            idxx = Square_TopMove[idxx];
            if (SquarePrun[idxx << 1 | ml] === check) {
              ++done;
              SquarePrun[inv ? i : idxx << 1 | ml] = ~~ (depth << 24) >> 24;
              if (inv)
                continue OUT;
            }
          }
          for (m = 0; m < 4; ++m) {
            idxx = Square_BottomMove[idxx];
            if (SquarePrun[idxx << 1 | ml] === check) {
              ++done;
              SquarePrun[inv ? i : idxx << 1 | ml] = ~~ (depth << 24) >> 24;
              if (inv)
                continue OUT;
            }
          }
        }
      }
    }
  }

  function set8Perm(arr, idx) {
    var i, m, p, v, val;
    val = 1985229328;
    for (i = 0; i < 7; ++i) {
      p = fact[7 - i];
      v = ~~ (idx / p);
      idx -= v * p;
      v <<= 2;
      arr[i] = ~~ ((~~val >> v & 7) << 24) >> 24;
      m = (1 << v) - 1;
      val = (val & m) + (~~val >> 4 & ~m);
    }
    arr[7] = ~~ (val << 24) >> 24;
  }

  var Square_BottomMove, Cnk, SquarePrun, Square_TopMove, Square_TwistMove, fact;

  function bitCount(x) {
    x -= ~~x >> 1 & 1431655765;
    x = (~~x >> 2 & 858993459) + (x & 858993459);
    x = (~~x >> 4) + x & 252645135;
    x += ~~x >> 8;
    x += ~~x >> 16;
    return x & 63;
  }

  function binarySearch(sortedArray, key) {
    var high, low, mid, midVal;
    low = 0;
    high = sortedArray.length - 1;
    while (low <= high) {
      mid = low + (~~(high - low) >> 1);
      midVal = sortedArray[mid];
      if (midVal < key) {
        low = mid + 1;
      } else if (midVal > key) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return -low - 1;
  }
  var square1Solver_initialized = false;
  var square1SolverInitialize = function (iniRandomSource) {
    setRandomSource(iniRandomSource);
    if (!square1Solver_initialized) {
      Shape_$clinit();
      Square_$clinit();
    }
    square1Solver_initialized = true;
  };
  var square1SolverRandomSource;
  var setRandomSource = function (src) {
    square1SolverRandomSource = src;
  };
  var square1SolverGetRandomPosition = function () {
    if (!square1Solver_initialized) {
      square1SolverInitialize();
    }
    return FullCube_randomCube();
  };
  var square1SolverGenerate = function (state) {
    var search_search = new Search_Search();
    return Search_solution(search_search, state);
  };
  var square1SolverGetRandomScramble = function () {
    var randomState = square1SolverGetRandomPosition();
    var scrambleString = square1SolverGenerate(randomState);
    return scrambleString;
  };
  var setScrambleLength = function (length) {
    return null;
  };
  return {
    initialize: square1SolverInitialize,
    setRandomSource: setRandomSource,
    getRandomScramble: square1SolverGetRandomScramble,
    setScrambleLength: setScrambleLength
  };
}();
module.exports = scrambler;

},{}],8:[function(require,module,exports){
/* jshint node: true */

var util = require('./util.js');

var scramblers = {};
scramblers = require('./scramblers/NNN.js');
scramblers.clock = require('./scramblers/clock.js');
scramblers.minx = require('./scramblers/minx.js');
scramblers.pyram = require('./scramblers/pyram.js');
scramblers.sq1 = require('./scramblers/sq1.js');
scramblers.skewb = require('./scramblers/skewb.js');

/**
 * A scramble generator
 * @constructor
 */
function Scrambo() {

	this.t = '333';
	this.l = 20;
	this.s = Math;

	this.length(this.l);

	this.type(this.t);

	return this;
}

/**
 * Gets/Sets scramble type
 * @param {string} type scramble type
 * @returns {string} set type
 */
Scrambo.prototype.type = function(type) {
	if (!arguments.length) return this.t;

	this.t = type;

	this.init();

	return this;
};

/**
 * Return a scramble
 * @param {number} num number of scrambles
 * @returns {string} generated scramble
 */
Scrambo.prototype.get = function(num) {
  num = num || 1;

	var stack = [];
	for(var i = 0; i < num; i++) {
		stack.push(scramblers[this.t].getRandomScramble());
	}

	return stack;
};

/**
 * Sets the seed
 * @param {num|Math} random source
 */
Scrambo.prototype.seed = function(seed) {
	if (!arguments.length) return this.s;

	// Force to string so we get consistent seeds.
	seed = seed + '';
	// Hash the string into a number.
	seed = util.hashCode(seed);
	// http://stackoverflow.com/a/19303725
	this.s = {
		random: function() {
			var x = Math.sin(seed++) * 10000;
    		return x - Math.floor(x);
		}
	};

	this.init();

	return this;
};

/**
 * Gets/Sets the scramble length
 * @param {num|Math} random source
 */
Scrambo.prototype.length = function(length) {
	if (!arguments.length) return this.l;

	this.l = length;

	scramblers[this.t].setScrambleLength(this.l);

	return this;
};

/**
 * Initializes the scrambler
 */
Scrambo.prototype.init = function() {

	// Check the scrambler exists.
	if(!scramblers.hasOwnProperty(this.t)){
		throw new Error('invalid scrambler, allowed: ' + Object.keys(scramblers));
	}

	scramblers[this.t].initialize(this.s);
};

module.exports = Scrambo;
},{"./scramblers/NNN.js":2,"./scramblers/clock.js":3,"./scramblers/minx.js":4,"./scramblers/pyram.js":5,"./scramblers/skewb.js":6,"./scramblers/sq1.js":7,"./util.js":9}],9:[function(require,module,exports){
/* jshint node: true */

// http://stackoverflow.com/a/7616484
// Allows string seeds yay!
module.exports.hashCode = function(str) {
  var hash = 0, i, chr, len;
    /* istanbul ignore if */
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

},{}]},{},[1]);
