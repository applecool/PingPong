//GLOBAL VARIABLES
	var pingpong = {}
	
	pingpong.keyStrokes = [];

	pingpong.ball = {
		speed: 5,
		x:150,
		y:100,
		directionX: 1,
		directionY: 1

	}

var KEY = { 
	UP: 38,
    DOWN: 40, 
    W: 87, 
    S: 83
}
$(function(){
    $("#racketB").css("top", "20px");
  	$("#racketA").css("top", "60px");

	pingpong.timer=setInterval(gameloop,30);

	$(document).keydown(function(e){

		pingpong.keyStrokes[e.which] = true;
	});

	$(document).keyup(function(e){

		pingpong.keyStrokes[e.which] = false;
	});

});

	function gameloop() { 
		
		moveBall();
		moverackets();
     }


function moveBall(){
	// reference useful variables
	var playarenaHeight = parseInt($("#playarena").height());
	
	var playarenaWidth = parseInt($("#playarena").width());

	var ball = pingpong.ball;

	// check playarena boundary 
	// check bottom edge
	if(ball.y + ball.speed * ball.directionY > playarenaHeight){
		ball.directionY = -1;
	}
	// check top edge
	if(ball.y + ball.speed * ball.directionY < 0){
		ball.directionY=1;
	}
	// check right edge
	/*if(ball.x + ball.speed * ball.directionX > playarenaWidth){
		ball.directionX = -1;
	}*/
	if(ball.x + ball.speed * ball.directionX > playarenaWidth){
		//player B lost.
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
		//reset the ball
		ball.x = 250;
		ball.y - 100;

		$("#ball").css({
			"left" : ball.x,
			"top": ball.y
		});

		ball.directionX = -1;
	}
	// check left edge
	/*if(ball.x + ball.speed * ball.directionX < 0){
		ball.directionX = 1;
	}*/

	if(ball.x + ball.speed * ball.directionX < 0){
		//player A lost
		pingpong.scoreB++; 
		$("#scoreB").html(pingpong.scoreB);
		//reste the ball

		ball.x = 150;
		ball.y = 100;

		$("#ball").css({
			"left" :ball.x ,
			"top": bal.y

		});

		ball.directionX = 1;
	}

	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	// check moving racket

	// check left racket

	var racketAX = parseInt($("#racketA").css("left")) + parseInt($("#racketA").css("width"));

	var racketAYBottom = parseInt($("#racketA").css("top")) + parseInt($("#racketA").css("height"));

	var racketAYTop = parseInt($("#racketA").css("top"));

	if(ball.x + ball.speed * ball.directionX < racketAX){
		if(ball.y + ball.speed * ball.directionY <= racketAYBottom && ball.y + ball.speed * ball.directionY >= racketAYTop){
			ball.directionX = 1 ;
		}
	}

	//check right racket

	var racketBX = parseInt($("#racketB").css("left")) - parseInt($("#racketB").css("width"));

	var racketBYBottom = parseInt($("#racketB").css("top")) + parseInt($("#racketB").css("height"));

	var racketBYTop = parseInt($("#racketB").css("top"));

	if(ball.x + ball.speed * ball.directionX >= racketBX){
		if(ball.y + ball.speed * ball.directionY <= racketBYBottom && ball.y + ball.speed * ball.directionY >= racketBYTop){
			ball.directionX = -1;
		}
	}
	// actually move the ball with speed and direction
	$("#ball").css({
		"left" : ball.x,
		"top" : ball.y
	});
 }

function moverackets() { 
   
   if (pingpong.keyStrokes[KEY.UP]) { 
		var top = parseInt($("#racketB").css("top"));
 		$("#racketB").css("top",top-5);
	} 
	
	if (pingpong.keyStrokes[KEY.DOWN]) { 

		var top = parseInt($("#racketB").css("top")); 
		$("#racketB").css("top",top+5);
}

	if(pingpong.keyStrokes[KEY.W]){

		var top= parseInt($("#racketA").css("top"));
		$("#racketA").css("top",top-5);
}

	if(pingpong.keyStrokes[KEY.S]){

		var top =parseInt($("#racketA").css("top"));
		$("#racketA").css("top",top+5);
}
}

