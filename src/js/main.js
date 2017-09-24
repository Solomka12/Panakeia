//= ./libs/jquery-1.11.0.min.js
//= ./libs/jquery-migrate.min.js
//= ./libs/html5.js

$(function(){

	var hf = function(){
		var h_header = $('header').height();
		var h_footer = $('footer').height();
		$('.content').css({
			'paddingTop': h_header,
			'paddingBottom': h_footer
		});
	}

	$(window).bind('load resize', hf);

});


/*
$(document).ready(function() {

	$(document).ready(changeColor)

	$('.box').on('click', changeColor);

	function changeColor() {
		$('.box').css('background', randColor)
		.css('border-color', randColor)
		.css('color', randColor);
	}

	function randColor() {
		return '#' + getRandomInt(0, 16777215).toString(16);
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
});
*/



