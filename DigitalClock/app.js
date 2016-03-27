//페이지가 로딩된 후 해당 함수가 수행됩니다.
( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			var page = document.getElementsByClassName( 'ui-page-active' )[0],
			pageid = page ? page.id : "";
			if( pageid === "main" ) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	} );
//	Drawing Digital Clock
	var canvas = document.getElementById('canvas');
	var ctx = null;
	var timerId = null;
	var flagShow = false;
	
	function onErrorCallback(error) {
		console.log("An error occurred " + error.message);
	}
	
	function onDisplaySuccessCallback(info) {
		console.log(canvas.width + canvas.height);
		canvas.width = info.resolutionWidth;
		canvas.height = info.resolutionHeight;
	}
	
//	다양한 해상도 지원을 위해서 Canvas의 해상도를 동적으로 받아오기
	tizen.systeminfo.getPropertyValue("DISPLAY", onDisplaySuccessCallback, onErrorCallback);
	
	function drawTime() {
		var width = canvas.width, height = canvas.height-250;
		if (ctx != null) {
			var timeStr, grd;
			var now = tizen.time.getCurrentDateTime();
			var curHour = now.getHours();
			var curMin = now.getMinutes();
			
//			시간 설정
			timeStr = (curHour < 10)?'0'+curHour:curHour;
			timeStr += (flagShow)?":":".";
			timeStr += (curMin < 10)?'0'+curMin:curMin;
			console.log(timeStr + "/" + height);
			flagShow = !flagShow;
			ctx.clearRect(0, 0, width, height);
			
//			Gradient 생성
			grd = ctx.createLinearGradient(40, 0, 380, 0);
			grd.addColorStop(0, "white");
			grd.addColorStop(1, "blue");
			
//			Gradient로 채움 및 폰트 속성 설정
			ctx.fillStyle = grd;
			ctx.font = "120px Tizen";
//				시간이 표시되는 위치를 동적으로 결정
				var position = (height+100)/2;
			ctx.fillText(timeStr, (width-300)/2, position);
			ctx.strokeText(timeStr, (width-300)/2, position);
		};
	}
	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		drawTime();
//		타이머를 이용해서 주기적으로 시간표시
		timerId = setInterval(drawTime, 500);
	};
} () );