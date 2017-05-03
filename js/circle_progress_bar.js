(function($){
	$.fn.circleProgressBar = function(options){
		$.fn.circleProgressBar.defaults = {
			valueStart: 0,
			font: "26px Arial",
			textColor: "red",
			circleColor: "#ccc",
			circleWidth: 10,
			pathColor: "red",
			pathWidth: 10,
			speed: 20
		};

		var opts = $.extend({},$.fn.circleProgressBar.defaults,options);

		var valueEnd = this.find('span.counter').text(),
			lastChar = getLastChar(valueEnd),
			newValue = opts.valueStart,
			ID = "c" + randomString();

		valueEnd = getValue(valueEnd);
		this.append("<canvas id='" + ID + "'></canvas>");

		var canvas = document.getElementById(ID),
			context = canvas.getContext('2d'),
			canvasWidth = this.width(),
			canvasHeight = this.height();

			canvas.width = canvasWidth;
			canvas.height = canvasHeight;

		//check if last char of a value is a symbole like '%'
		function getLastChar(value) {
			var char = value[value.length-1];

			if(!isNaN(char)) {
				char = "";
			};
			return char;
		};
			
		function getValue(v) {
			if (getLastChar(v) != "") {
				v = v.substr(0,v.length-1);
			};
			return v;
		};

		function randomString() {
			var chars = "0123456789abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ",
				str = '';

			for (i = 0; i < 5 ; i++) {
				str += chars[Math.floor(Math.random()*chars.length)];
			}
			return str;
		};

		function drawNumber(value){
			context.font = opts.font;
			context.fillStyle = opts.textColor;
			context.textAlign = "center";
			//vertical centering 
			context.strokeStyle = "transparent";
			context.moveTo(0, canvasHeight/2);
			context.lineTo(canvasWidth, canvasHeight/2);
			context.stroke();
			context.textBaseline = "middle";
			context.fillText(value + lastChar, canvasWidth/2, canvasHeight/2);
		};

		function drawCircle() {
			context.lineWidth = opts.circleWidth;
			context.strokeStyle = opts.circleColor;
			context.beginPath();
			context.arc(canvasWidth/2, canvasHeight/2, canvasHeight/2 - opts.pathWidth/2, 0, 2*Math.PI);
			context.stroke();
		};

		function drawPath(value) {
			context.lineWidth = opts.pathWidth;
			context.strokeStyle = opts.pathColor;
			context.beginPath();
			context.arc(canvasWidth/2, canvasHeight/2, canvasHeight/2 - opts.pathWidth/2, 1.5*Math.PI , (1.5 + 2*value/100)*Math.PI);
			context.stroke();
		}

		function draw() {
			var loop = setInterval(function(){
				context.clearRect(0,0,canvasWidth,canvasHeight);
				newValue++;
				drawCircle();
				drawNumber(newValue);
				drawPath(newValue);
				if (newValue == valueEnd) {
					clearInterval(loop);
				}
			}, opts.speed);
		};

	draw();
	return this;

	};

})(jQuery);