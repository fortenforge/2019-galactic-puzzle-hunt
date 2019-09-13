var PUZZLE_URL = "/puzzle/race-for-the-galaxy/puzzle";
var GRID_WIDTH = 11;
var GRID_HEIGHT = 11;
var START_CODE = 'RACESTART';

var main = function() {
    var tag = "";
    var curRound = 0;

    var getStart = function(){
        $('#error').hide();
        $('#puzzle_main').hide();
        var requestData = {};
        raceForTheGalaxyServer.getStart(requestData, function(responseData) {
            if(responseData.error.length > 0){
                $('#error').show();
                $('#error').html(responseData.error);
            }else{
                $('#puzzle_start').show();
                var secondsPassed = responseData.seconds_passed;
                var secondsUntilNext = responseData.seconds_until_next;
                curRound = responseData.round_number;
                $('#current_race').html("The current race started " + 
                                        Math.floor(secondsPassed/60) + 
                                        " minutes and " +
                                        (secondsPassed%60) +
                                        " seconds ago.");
                $('#next_race').html("The next race will start in  " + 
                                        Math.floor(secondsUntilNext/60) + 
                                        " minutes and " +
                                        (secondsUntilNext%60) +
                                        " seconds.");
            }
        });
    }

    var getPuzzle = function(round_number, answer_guess){
        $('#error').hide();
        var requestData = {"round_number": round_number,
                           "answer_guess": answer_guess,
                           "tag": tag};
        raceForTheGalaxyServer.getPuzzle(requestData, function(responseData){
            console.log(responseData);
            if(responseData.error.length > 0){
                $('#error').show();
                $('#error').html(responseData.error);
            }else if(responseData.victory.length > 0) {
                $('#puzzle_start').hide();
                $('#puzzle_main').hide();
                $('#victory').html(responseData.victory);
            }else{
                $('#answer').val('');
                $('#puzzle_start').hide();
                
                $('#puzzle_body').html(responseData.puzzle_html);

                setTimer(responseData.time_left);
                tag = responseData.tag;

                $('#puzzle_main').show();
            }
        });
    }

    function formatTime(minutes, seconds){
        if(seconds > 9){
            return minutes + ":" + seconds;
        } else {
            return minutes + ":0" + seconds;
        }
    }


    var timer = setInterval(function(){}, 1000);
    var setTimer = function(timeLeft){

        clearInterval(timer);
        timer = setInterval(function(){
            if(timeLeft <= 0){
                $("#error").html("Sorry, you didn't finish the puzzle in time. Click <a href=\"/\">here</a> to return to the main page.");
                $("#countdown").html = ""+"";
                clearInterval(timer);
            } else {
                timeLeft -= 1;
                $("#countdown").html(formatTime(Math.floor(timeLeft/60), (timeLeft%60)));
            }
            }, 1000);
    }

    $('#answer_puzzle').on('submit', function(){
        getPuzzle(curRound, $('#answer').val());
        return false;
    });

    $('#join_race').click(function(){
        console.log("joining race...");
        getPuzzle(curRound, START_CODE);
        return false;
    });

    $('#puzzle_start').hide();
    $('#puzzle_main').hide();
    getStart();
};
    

$(document).ready(main);