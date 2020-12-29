$(document).ready(function() {
    $('#keyboard-upper-container').hide();

    // $('html, body').css({
    //     overflow: 'hidden',
    //     height: '100%'
    // });
    
    $(document).keydown(function (e) {
        if (e.keyCode === 16) {
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();
        };
    });
    
    $(document).keyup(function (e) {
        if (e.keyCode === 16) {
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
        };
    });

    $(document).on('keypress', function() {
        
        let keyClicked = event.which;
        $(`#${event.which}`).css('background', 'yellow');
    
        $(document).on('keyup', function () {
            $(`#${keyClicked}`).css('background', '');
        });
    });

    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate', 
        'Too ato too nOt enot one totA not anot tOO aNot', 
        'oat itain oat tain nate eate tea anne inant nean', 
        'itant eate anot eat nato inate eat anot tain eat', 
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];

    let i = 0;
    let l = 0;
    let howManyWords = 0;
    let wordsPerMin = 0
    let moveBlock = 10;
    let startTime = new Date();
    let startMin = startTime.getMinutes();
    let numOfMistakes = 0;

    $('#sentence').text(sentences[i]);
    $('#target-letter').text(`${sentences[i][l]}`);

    function calculateAccuracy() {
        let endTime = new Date();
        let endMin = endTime.getMinutes();
        let minutes = startMin - endMin;
        howManyWords = 54 / minutes - 2 * numOfMistakes;
        wordsPerMin = Math.abs(howManyWords);
    };
    
    $(document).on('keypress', function() {
        calculateAccuracy();

        if (i === 4 && l === 48) {

            $('#feedback').text('');
            $('#target-letter').text('Game Over!');
            let tellMeAboutWords = `You're words per minute ${wordsPerMin}!`

            if (wordsPerMin <= 10) {
                
                $('#target-letter').append(`<div class="endResult">${tellMeAboutWords}<br>Dang. That's not so good...</div>`);

            } else if (wordsPerMin > 10 && wordsPerMin <= 50) {

                $('#target-letter').append(`<div class="endResult">${tellMeAboutWords}<br>I know you can do better!</div>`);

            } else if(wordsPerMin > 50 && wordsPerMin <=75) {

                $('#target-letter').append(`<div class="endResult">${tellMeAboutWords}<br>Nice! Great job! Keep practicing!</div>`);
            
            } else if (wordsPerMin > 75 && wordsPerMin <=99) {

                $('#target-letter').append(`<div class="endResult">${tellMeAboutWords}<br>That's great! All the hard work paying off!</div>`);

            } else if (wordsPerMin <99) {

                $('#target-letter').append(`<div class="endResult">${tellMeAboutWords}<br>YOU'RE AMAZING! BLAZING FA!</div>`);

            };

            $('.endResult').css({
                'font-size': '20px',
                'text-decoration': 'underline'
            });

            $('#32').after('<div class="playAgain">Play Again?</div>');
            $('.playAgain').css('font-size', "30px");
            $('.playAgain').after('<button class = "round2">Oh, Yay!</button>');
            $('.round2').after('<button class="chicken">Nah, I\'m good.</button>');
            $('button').css ({
                'margin':'10px',
                'padding':'10px',
            });

            $('.round2').on('click', function () {
                alert("Get your fingers ready!!");
                location.reload();
            });

            $('.chicken').on('click', function() {
                alert('Don\'t worry. Take some well deserved rest');
            });

            $(document).off();

        } else {

            $('#feedback').css({
                'display': 'flex',
                'flex-wrap': 'wrap'
            });

            if (event.which === sentences[i][l].charCodeAt()) {
                
                $('#yellow-block').css('margin-left', `${moveBlock}px`);
                moveBlock += 17;
                l++;
                $('#feedback').append('<div class="correct">✓</div>');
                $('.correct').css('color', 'lightgreen');

                if (l === (sentences[i].length - 1)) {
                    moveBlock = 0;
                };

                if (l === sentences[i].length) {
                    $('#feedback').text('');
                    i++
                    $('#sentence').text(sentences[i]);
                    l = 0
                };
                
                if(sentences[i][l].charCodeAt() === 32) {
                    
                    $('#target-letter').text('[space]');
                
                } else {
                    
                    $('#target-letter').text(`${sentences[i][l]}`);

                };
            
            } else {
                $('#feedback').append('<div class="incorrect">X</div>');
                $('.incorrect').css('color', 'red');
                numOfMistakes++;
            };
      
        };
    });

});