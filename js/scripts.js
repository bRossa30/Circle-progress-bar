$(function() {
	var countersContainer = $('.container');
	var counters = $('.counter-box');

	$(window).scroll(function() {
		var x = countersContainer.offset().top - $(window).innerHeight()*(2/3);

		if ($(window).scrollTop() > x)  {
			counters.each(function() {
				$(this).circleProgressBar({pathColor: "#006BF7", textColor: "#006BF7"});
			});
			$(window).off('scroll');
		};
	});
})
