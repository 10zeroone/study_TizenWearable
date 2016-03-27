var canvas, context, painter;
var posX, posY;

function DrawTool() {
	var painter = this;
	this.started = false;            
	
	//mousedown -> touchstart
	this.touchstart = function(ev) {
		var touchobj = ev.changedTouches[0];
		posX = parseInt(touchobj.clientX);
		posY = parseInt(touchobj.clientY);
		
		context.beginPath();
		context.moveTo(posX, posY);
		painter.started = true;
	};
	
	//mousemove -> touchmove
	this.touchmove = function(ev) {
		var touchobj = ev.changedTouches[0];
		posX = parseInt(touchobj.clientX);
		posY = parseInt(touchobj.clientY);
		
		if (painter.started) {
			context.lineTo(posX, posY);
			context.stroke();
		}
	};
	
	//mouseup -> touchend
	this.touchend  = function(ev) {
		if (painter.started) {
			painter.mousemove(ev);
			painter.started = false;
		}
	};
}

function drawCanvas(ev) { 
	// DrawTool의 이벤트 핸들러를 호출한다.
	var func = painter[ev.type];
	if (func) {
		func(ev);
	}
} 

window.onload = function() {
    // TODO:: Do your initialization job
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	if (!context) {
		alert("getContext() 함수를 호출 할 수 없음");
		return;
	}
	
	//문서크기에 맞춰서 동적으로 Canvas크기 조정
	canvas.width=document.width;
	canvas.height=document.height;
	
	//객체(Object): 자주 사용되는 객체를 정의해 놓은 것
	//new 연산자를 사용하여 객체 생성
	painter = new DrawTool();
	
	//TODO : PC의 마우스 이벤트를 모바일의 터치이벤트로 수정
	canvas.addEventListener('touchstart', drawCanvas, false); 
	canvas.addEventListener('touchmove', drawCanvas, false);
	canvas.addEventListener('touchend',   drawCanvas, false); 
};
