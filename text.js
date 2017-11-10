$(window).on("scroll", function() {
	var f = $(".title");
	var t = $(".text");
	var w = $(window);
	var topVis = w.scrollTop()+240 < t.offset().top; // виден ли верх блока
	//если виден
	if (topVis)
	{
		$('.title-fixed').css('display', 'none');
		f.css('color', 'rgba(0,0,0,1)');
		$('.buttonUp').css('opacity', '0');
	}
	//если не виден
	else
	{
		$('.title-fixed').css('display', 'block');
		f.css('color', 'rgba(0,0,0,0)');
		$('.buttonUp').css('opacity', '1');
	}
});

function GoUp() {
	$('html').scrollTo(0, 1000);
}