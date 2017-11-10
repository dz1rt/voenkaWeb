var videoDiv = document.getElementsByTagName('video')[0];

//через 35 секунд поменять видео
setTimeout(function(){
	//videoDiv.remove();
	document.getElementsByTagName('video')[1].play();
	$('._bgvideo').animate({opacity:'1.0'},600);
}, 35000);

$('body').css("background", "#000");