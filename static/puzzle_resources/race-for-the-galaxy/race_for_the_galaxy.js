// Note: The code below contains spoilers for the puzzle Race for the Galaxy!
var raceForTheGalaxyServer = (function() {
    var STARTNAME = 'RACESTART'
    var GLOBAL_START = Math.floor(new Date(2019, 2, 27, 21, 0).getTime()/1000);
    var ROUND_OFFSET = 3*60;
    var META_SECRET = 'thisisasecret';
    var DEBUG = 'DEBUGDEBUG'
    var PUZZLE_CLOSE_UNIT = 1*60;
    var PUZZLE_CLOSES = [3, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33];

    function dateNow() {
        return Math.floor(Date.now()/1000);
    }
    
    function error(error_msg) {
        return {
            'error': error_msg
        };
    }

    function victory(victory_msg) {
        return {
            'victory': victory_msg,
            'error': ''
        };
    }

    function generateTag(round) {
        return md5(META_SECRET + round.toString(10)).slice(0,6);
    }
    
    function getStart(requestData, callback) {
        var now = dateNow();
        var round_number = Math.floor((now - GLOBAL_START)/ROUND_OFFSET)
    
        var round_start = GLOBAL_START + ROUND_OFFSET*round_number
        var time_passed = (now - round_start)
        var time_until_next = (ROUND_OFFSET - time_passed)

        return callback({
            'seconds_passed': time_passed,
            'seconds_until_next': time_until_next,
            'round_number': round_number,
            'error': ''
        });
    }

    async function getPuzzle(requestData, callback) {
        var round_number = requestData.round_number;
        var puzzle_round = PUZZLE_ROUNDS[round_number % PUZZLE_ROUNDS.length];
        var answers = puzzle_round.slice(-1)[0].slice(-1)[0].slice(-1)[0];
        var meta_answer = puzzle_round.slice(-1)[0].slice(-1)[0][0];
        var meta_tag = generateTag(round_number).toUpperCase();

        var round_start = GLOBAL_START + ROUND_OFFSET*round_number
        var meta_close = (round_start + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES.slice(-1)[0])

        var puzzlename = requestData.answer_guess;
        puzzlename = puzzlename.trim().toUpperCase();
        puzzlename = puzzlename.split('').filter(c => c.match(/\w/)).join('');
        var puzzle_index = 0
        var puzzletag = requestData.tag.trim().toUpperCase();

        if (answers.indexOf(puzzlename) > -1) {
            puzzle_index = answers.indexOf(puzzlename) + 1;
            var puzzle_close = (round_start + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES[puzzle_index]);
        } else if (puzzlename == meta_answer) {
            if (puzzletag == meta_tag) {
                if (dateNow() > meta_close) {
                    return callback(error("Sorry, you were too slow."));
                } else {
                    return callback(victory('Congratulations on completing the race! The answer to this puzzle is STRONGER.'));
                }
            } else {
                return callback(error('Nice try, but you need to solve all the puzzles!')); 
            }
        } else if (puzzlename == meta_answer && puzzletag == meta_tag) {
            if (dateNow() > meta_close) {
                return callback(error("Sorry, you were too slow."))
            } else {
                return callback(victory('Congratulations on completing the race! The answer to this puzzle is STRONGER.'));
            }
        } else if (puzzlename == DEBUG) {
            return callback(victory(answers.join(',')));
        } else if (puzzlename != STARTNAME) {
            return callback(error("Sorry, this is not the answer to the puzzle."));
        }

        var puzzle_close = (round_start + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES[puzzle_index]);

        if (dateNow() < round_start) {
            return callback(error("You can't access this puzzle until the race starts!"));
        }
        if (dateNow() > puzzle_close) {
            return callback(error("Sorry, you were too slow."));
        }

        var time_left = 0;
        if (puzzle_index + 1 < PUZZLE_CLOSES.length) {
            var next_puzzle_close = (round_start
                                + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES[puzzle_index + 1])
            time_left = next_puzzle_close - dateNow();
        }


        var [puzzle_type, puzzle, _] = puzzle_round[puzzle_index];
        var puzzle_html = PUZZLE_TEMPLATE.render(
                          {'puzzle_type': puzzle_type,
                           'puzzle_num': (puzzle_index+1),
                           'puzzle': puzzle});
         
        return callback({
            'puzzle_html': puzzle_html,
            'time_left': time_left,
            'round_number': round_number,
            'tag': puzzle_type == 'META' ? meta_tag : '',
            'error': '',
            'victory': ''
        });
    }

    return {
        getStart,
        getPuzzle,
    };
})();