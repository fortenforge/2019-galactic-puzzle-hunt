var raceForTheGalaxyServer = (function() {
    var GLOBAL_START = Math.floor(new Date(2019, 2, 27, 21, 0).getTime()/1000);
    var ROUND_OFFSET = 3*60;
    
    function getStart(requestData, callback) {
        var now = Math.floor(Date.now()/1000);
        var round_number = Math.floor((now - GLOBAL_START)/ROUND_OFFSET)
    
        var round_start = GLOBAL_START + ROUND_OFFSET*round_number
        var time_passed = (now - round_start)
        var time_until_next = (ROUND_OFFSET - time_passed)

        callback({
            'seconds_passed': time_passed,
            'seconds_until_next': time_until_next,
            'round_number': round_number,
            'error': ''
        });
    }

    async function getPuzzle(requestData, callback) {
        /*
        var round_number = requestData.round_number;
        var puzzle_round = PUZZLE_ROUNDS[round_number % len(PUZZLE_ROUNDS)]
        var answers = puzzle_round[-1][-1][-1]
        var meta_answer = puzzle_round[-1][-1][0]
        var meta_tag = generate_tag(round_number).upper()

    round_start = GLOBAL_START + ROUND_OFFSET*round_number
    meta_close = (round_start + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES[-1])

    puzzlename = request.POST['answer_guess']
    puzzlename = puzzlename.strip().upper()
    puzzlename = ''.join(c for c in puzzlename if c in ALLOWED)
    puzzle_index = 0

    puzzletag = request.POST['tag'].strip().upper()
    
    
    if puzzlename in answers:
        puzzle_index = answers.index(puzzlename) + 1
        puzzle_close = (round_start + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES[puzzle_index])
        team = get_team_or_none_from_request(request)
        if team is not None:
            if dt.datetime.now() <= puzzle_close:
                webhook_post(team, round_number, puzzle_index, (puzzle_close-dt.datetime.now()).seconds)
            else:
                webhook_post_fail(team, round_number, puzzle_index, (dt.datetime.now()-puzzle_close).seconds)
                
    elif puzzlename == meta_answer:
        if puzzletag == meta_tag:
            if dt.datetime.now() > meta_close:
                return error("Sorry, you were too slow.")
            else:
                team = get_team_or_none_from_request(request)
                if team is not None:
                    webhook_post_meta(team, round_number, (meta_close-dt.datetime.now()).seconds)
                return victory('Congratulations on completing the race! The answer to this puzzle is STRONGER.')
        else:
            return error('Nice try, but you need to solve all the puzzles!')
    elif puzzlename == meta_answer and puzzletag == meta_tag:
        if dt.datetime.now() > meta_close:
            return error("Sorry, you were too slow.")
        else:
            return victory('Congratulations on completing the race! The answer to this puzzle is STRONGER.')
    elif puzzlename == DEBUG:
        return victory(','.join(answers))
    elif puzzlename != STARTNAME:
        return error('Sorry, this is not the answer to the puzzle.')

    puzzle_close = (round_start + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES[puzzle_index])

    if dt.datetime.now() < round_start:
        return error("You can't access this puzzle until the race starts!")
    if dt.datetime.now() > puzzle_close:
        return error("Sorry, you were too slow.")

    time_left = 0
    if puzzle_index + 1 < len(PUZZLE_CLOSES):
        next_puzzle_close = (round_start
                             + PUZZLE_CLOSE_UNIT*PUZZLE_CLOSES[puzzle_index + 1])
        time_left = (next_puzzle_close - dt.datetime.now()).seconds

    print time_left

    puzzle_type, puzzle, _ = puzzle_round[puzzle_index]
    puzzle_html = PUZZLE_TEMPLATE.render(
                          {'puzzle_type': puzzle_type,
                           'puzzle_num': (puzzle_index+1),
                           'puzzle': puzzle})

    return HttpResponse(json.dumps({
            'puzzle_html': puzzle_html,
            'time_left': time_left,
            'round_number': round_number,
            'tag': meta_tag if puzzle_type == 'META' else '',
            'error': '',
            'victory': ''}))
    }*/

    return {
        getStart,
        getPuzzle,
    };
})();