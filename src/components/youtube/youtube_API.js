import { white_play_icon, pause_icon } from '../icon'

let player

function pause(){
	document.getElementById('play_button').src = white_play_icon
	document.getElementById('play_button').style.display = 'block'
	document.getElementById('pause_button').style.display = 'none'
	player.pauseVideo()
}

export function play(){
	document.getElementById('play_button').src = pause_icon
	document.getElementById('play_button').style.display = 'none'
	document.getElementById('pause_button').style.display = 'block'
	player.playVideo()
}

export function onYouTubeIframeAPIReady(){
	player = new YT.Player('player', {
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange,
		},
	})
}

function onPlayerReady(event){
	document.getElementById('play_button').src = white_play_icon
	document.getElementById('play_button').style.display = 'block'
	document.getElementById('pause_button').style.display = 'none'
	init_youtube()
}

function onPlayerStateChange(event){
	if (event.data == 1) {
		play()
	}
}

export function init_youtube(){
	document.getElementById('pause_button').onclick = () => {
		if (player.getPlayerState() == 1) {
			pause()
		}
	}
	document.getElementById('play_button').onclick = () => {
		if (player.getPlayerState() != 1) {
			play()
		}
	}
}
