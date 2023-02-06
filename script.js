var markers = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        playerVars: {
            'disablekb': 1,
            'origin': 'https://cmsheehan.github.io' 
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

$(document).ready(function() {
    $("form").submit(function() {
        console.log("test")
        var videoUrl = $('#videoUrl').val();
        console.log(videoUrl)
        var videoId = extractVideoId(videoUrl);
        console.log(videoId)
        //loadPlayer(videoId);
        updatePlayer(videoId)
        $('#videoUrl').blur();
    });
});

function extractVideoId(videoUrl) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    var match = videoUrl.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function loadPlayer(videoId) {

}

// Update the player with a new video ID
function updatePlayer(videoId) {
    player.loadVideoById(videoId);
}

function formatTime(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);
    let seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
        return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    } else {
        return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
    }
}

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         height: '360',
//         width: '640',
//         videoId: 'zF5Qsg3HE08',
//         playerVars: {
//           'disablekb': 1
//         },
//         events: {
//             'onReady': onPlayerReady
//         }
//     });
// }

function setTime(key_value) {
    current_time = player.getCurrentTime();
    marker_value = key_value - 1;
    markers[marker_value] = current_time;
    current_time = formatTime(current_time);
    document.getElementById("key" + key_value).innerHTML = current_time;
}

function flash(key_value) {
    console.log("binding-" + key_value)
    flashContainer = document.getElementById("binding-" + key_value);
    flashContainer.classList.add("flash");
    setTimeout(function() {
        flashContainer.classList.remove("flash");
    }, 1000);
}

function onPlayerReady(event) {
    document.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "Digit1":
                player.seekTo(markers[0]);
                flash("1");
                break;
            case "Digit2":
                player.seekTo(markers[1]);
                flash("2");
                break;
            case "Digit3":
                player.seekTo(markers[2]);
                flash("3");
                break;
            case "Digit4":
                player.seekTo(markers[3]);
                flash("4");
                break;
            case "Digit5":
                player.seekTo(markers[4]);
                flash("5");
                break;
            case "Digit6":
                player.seekTo(markers[5]);
                flash("6");
                break;
            case "Digit7":
                player.seekTo(markers[6]);
                flash("7");
                break;
            case "Digit8":
                player.seekTo(markers[7]);
                flash("8");
                break;
            case "Digit9":
                player.seekTo(markers[8]);
                flash("9");
                break;
            case "Enter":
                player.playVideo();
                break;
            case "Space":
                player.pauseVideo();
                break;
            case "KeyQ":
                setTime(1);
                flash("q");
                break;
            case "KeyW":
                setTime(2);
                flash("w");
                break;
            case "KeyE":
                setTime(3);
                flash("e");
                break;
            case "KeyR":
                setTime(4);
                flash("r");
                break;
            case "KeyT":
                setTime(5);
                flash("t");
                break;
            case "KeyY":
                setTime(6);
                flash("y");
                break;
            case "KeyU":
                setTime(7);
                flash("u");
                break;
            case "KeyI":
                setTime(8);
                flash("i");
                break;
            case "KeyO":
                setTime(9);
                flash("o");
                break;
        }
    });
}

function updateMarker(key, time) {
    markers[key - 1] = time;
}