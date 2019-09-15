// Note: The code below contains spoilers for the puzzle Race for the Galaxy!
var PUZZLE_TEMPLATE = (function() {
    function render(args) {
        var puzzle_type = args.puzzle_type;
        var puzzle_num = args.puzzle_num;
        var puzzle = args.puzzle;

        var out = '';

        function get_color(c) {
            if (c == 'R') return 'red';
            else if (c == 'B') return 'blue';
            else if (c == 'G') return 'green';
            else if (c == 'Y') return 'yellow';
        }

        if (puzzle_type == 'META') {
            out += '<h3>Meta Puzzle</h3>';
        } else {
            out += `<h3>Puzzle #${puzzle_num}</h3>`;
        }
 
        if (puzzle_type == 'ENCODINGS') {
            for (var encoding of puzzle) {
                if (encoding[0] == 'morse')  {
                    out += `<h4>${encoding[1]}</h4>`;
                } else {
                    out += `<img src='../static/puzzle_resources/race-for-the-galaxy/encodings/${encoding[1]}.png'>`;
                    out += `<br>`;
                }
            }
        } else if (puzzle_type == 'ANAGRAMS') {
            out += '<ul>';            
            for (var anagram of puzzle) {
                out += `<li>${anagram}</li>`;
            }
            out += '</ul>';            
        } else if (puzzle_type == 'DROPQUOTE') {
            out += '<table class="dropquote">';
            out += '<tr class="dropquote">';
            for (var bucket of puzzle['buckets']) {
                out += `<td class="dropquote"> 
                    <div style="width:10px;word-wrap:break-word">
                        ${bucket}
                    </div>
                </td>`;
            }
            out += '</tr>';
            for (var row of puzzle['grid']) {
                out += '<tr class="dropquote">';
                for (var cell of row) {
                    if (cell) {
                        out += `<td class="dropquote" style="background-color:black;">
                            <div style="min-height:10px"></div>
                        </td>`;
                    } else {
                        out += `<td class="dropquote" style="background-color:whitesmoke;">
                            <div style="min-height:10px"></div>
                        </td>`;
                    }
                }
                out += '</tr>';
            }
            out += '</table>';
        } else if (puzzle_type == 'CRYPTOGRAM') {
            out += `<p>${puzzle}</p>`;
        } else if (puzzle_type == 'WORDSEARCH') {
            out += `<table class='wordsquare'>`;
            for (var row of puzzle['grid']) {
                out += `<tr class='wordsquare'>`;
                for (var cell of row) {
                    out += `<td class='wordsquare'> ${cell} </td>`;
                }
                out += `</tr>`;
            }
            out += `</table>`;
            out += `<ul>`;
            
            for (const word of puzzle['words'].sort()) {
                out += `<li>${word}</li>`;
            }
            out += `</ul>`;
        } else if (puzzle_type == 'ACTORS') {
            for (var url of puzzle) {
                out += `<img src='../static/puzzle_resources/race-for-the-galaxy/images/${url}.png'>`;
            }
        } else if (puzzle_type == 'WORDSQUARE') {
            out += `<table class='wordsquare'>`;
            for (var row of puzzle) {
                out += `<tr class='wordsquare'>`;
                for (var cell of row) {
                    out += `<td class='wordsquare'> ${cell} </td>`;
                }
                out += `</tr>`;
            }
            out += `</table>`;
        } else if (puzzle_type == 'SPOTTHEDIFFERENCE') {
            out += `<table>
            <tr>
            <td>
            <table class='wordsquare'>`;
            for (var row of puzzle['grid1']) {
                out += `<tr class='wordsquare'>`;
                for (var cell of row) {
                    out += `<td class='wordsquare'
                    style='font-weight:bold;color:${get_color(cell[1])};background-color:${get_color(cell[2])};'> 
                    ${cell[0]} </td>`;

                }
                out += `</tr>`;
            }
            out += `</table>
            </td>
            <td>
            <table class='wordsquare'>`;
            for (var row of puzzle['grid2']) {
                out += `<tr class='wordsquare'>`;
                for (var cell of row) {
                    out += `<td class='wordsquare'
                    style='font-weight:bold;color:${get_color(cell[1])};background-color:${get_color(cell[2])};'> 
                    ${cell[0]} </td>`;
                }
                out += `</tr>`;
            }
            out += `</table>
            </td>
            <td>
            <table class='wordsquare'>`;
            for (var row of puzzle['letters']) {
                out += `<tr class='wordsquare'>`;
                for (var cell of row) {
                    out += `<td class='wordsquare'> ${ cell } </td>`
                }
                out += `</tr>`;
            }
            out += `</table>
            </td>
            </tr>
            </table>`;
        } else if (puzzle_type == 'LOGIC') {
            out += `<p> Select all correct statements. </p>
            <ol>`;
            for (var subpuzzle of puzzle) {
                out += `<li>
                Which of the following statements is correct?
                
                <ol type='A'>`
                for (var statement of subpuzzle) {
                    out += `<li> ${statement} </li>`;
                }
                out += `</ol>
                </li>`;
            }
            out += `</ol>`;
        } else if (puzzle_type == 'CRYPTOGRAMSEARCH') {
            out += `<table class='wordsquare'>`;
            for (var row of puzzle['grid']) {
                out += `<tr class='wordsquare'>`;
                for (var cell of row) {
                    out += `<td class='wordsquare'> ${cell}</td>`;
                }
                out += `</tr>`;
            }
            out += `</table>`;
            
            out += `<ul>`;
            for (var word of puzzle['words'].sort()) {
                out += `<li>${word}</li>`;
            }
            out += '</ul>';
        }

        return out;
    }

    return {
        render: render,
    };
})();