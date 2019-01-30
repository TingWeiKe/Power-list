import { white_play_icon, pause_icon } from '../icon'
const tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player, iframe;
let $ = document.querySelector.bind(document);



export function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    console.log(event);
    
    iframe = $('#player')
    document.getElementById('play_button').src = white_play_icon
    document.getElementById('play_button').removeEventListener('click', pause)
    document.getElementById('play_button').addEventListener('click', play);
}

function pause() {
    player.pauseVideo()
}

function play() {
    player.playVideo()
}

function onPlayerStateChange(event) {
    if (event.data == 1) {
        document.getElementById('play_button').src = pause_icon
        document.getElementById('play_button').removeEventListener('click', play)
        document.getElementById('play_button').addEventListener('click', pause);

    }
    else {
        document.getElementById('play_button').src = white_play_icon
        document.getElementById('play_button').removeEventListener('click', pause)
        document.getElementById('play_button').addEventListener('click', play);

    }

}
