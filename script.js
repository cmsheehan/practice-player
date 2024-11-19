// Load the YouTube IFrame Player API asynchronously
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let markers = Array(9).fill(0);
let player;

// Default YouTube video ID
const defaultVideoId = "P3dtsFWJt0A";

// YouTube IFrame API ready callback
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: defaultVideoId, // Load default video
        playerVars: { disablekb: 1 },
        events: { onReady: onPlayerReady }
    });
}

$(document).ready(() => {
    // Handle video URL submission
    $('#videoForm').on('submit', (event) => {
        event.preventDefault();
        const videoUrl = $('#videoUrl').val();
        const videoId = extractVideoId(videoUrl);
        if (videoId !== 'error') {
            updatePlayer(videoId);
        }
    });
});

function extractVideoId(videoUrl) {
    const match = videoUrl.match(/(?:youtu\.be\/|v=|\/embed\/|\/v\/)([\w-]{11})/);
    return match ? match[1] : 'error';
}

// Update player with a new video ID
function updatePlayer(videoId) {
    if (player && typeof player.loadVideoById === 'function') {
        player.loadVideoById(videoId);
    } else {
        console.error("Player is not ready yet.");
    }
}

// Player ready callback
function onPlayerReady() {
    $(document).on('keydown', (event) => {
        switch (event.code) {
            case "ArrowRight":
                // Skip forward 5 seconds
                player.seekTo(player.getCurrentTime() + 5, true);
                flash("right-arrow");
                break;
            case "ArrowLeft":
                // Skip backward 5 seconds
                player.seekTo(player.getCurrentTime() - 5, true);
                flash("left-arrow");
                break;
            case "ArrowUp":
                // Speed up playback
                let increasedSpeed = player.getPlaybackRate() + 0.25;
                player.setPlaybackRate(Math.min(increasedSpeed, 2)); // Limit to 2x speed
                flash("up-arrow");
                break;
            case "ArrowDown":
                // Slow down playback
                let decreasedSpeed = player.getPlaybackRate() - 0.25;
                player.setPlaybackRate(Math.max(decreasedSpeed, 0.25)); // Limit to 0.25x speed
                flash("down-arrow");
                break;
            case "Space":
                // Play/Pause toggle
                const playerState = player.getPlayerState();
                if (playerState === YT.PlayerState.PLAYING) {
                    player.pauseVideo();
                } else if (playerState === YT.PlayerState.PAUSED || playerState === YT.PlayerState.CUED) {
                    player.playVideo();
                }
                flash("space-bar");
                break;
            default:
                // Handle other keys (like Digit1, Digit2, etc.)
                handleCustomKeys(event);
                break;
        }
    });
}

function handleCustomKeys(event) {
    const keyMap = {
        Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3,
        Digit5: 4, Digit6: 5, Digit7: 6, Digit8: 7, Digit9: 8,
        KeyQ: 0, KeyW: 1, KeyE: 2, KeyR: 3, KeyT: 4, KeyY: 5, KeyU: 6, KeyI: 7, KeyO: 8
    };
    const key = keyMap[event.code];
    if (key !== undefined) {
        if (event.code.startsWith('Digit')) {
            // Jump to the set marker
            player.seekTo(markers[key]);
            flash(event.code.slice(-1)); // Pass the digit for flashing
        } else if (event.code.startsWith('Key')) {
            // Set the current time to the marker
            markers[key] = player.getCurrentTime();
            const formattedTime = formatTime(markers[key]);
            $(`#key${key + 1}`).text(formattedTime);
            flash(event.code.slice(-1).toLowerCase()); // Pass the letter for flashing
        }
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Flash the key on the UI
function flash(key) {
    const bindingId = `#binding-${key}`;
    $(bindingId).animate({ backgroundColor: "#607D8B" }, 100, function() {
        $(bindingId).animate({ backgroundColor: "" }, 100);
    });
}
