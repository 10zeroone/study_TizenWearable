( function () {
//	window.addEventListener( 'tizenhwkey', function( ev ) {
//		if( ev.keyName === "back" ) {
//			var page = document.getElementsByClassName( 'ui-page-active' )[0],
//				pageid = page ? page.id : "";
//			if( pageid === "main" ) {
//				try {
//					tizen.application.getCurrentApplication().exit();
//				} catch (ignore) {
//				}
//			} else {
//				window.history.back();
//			}
//		}
//	} );
	//TODO 4: 페이지 로드시 Section Changer가 동작관련 코드
	//좌우방향으로 터치해서 여러 개의 화면(Section)을 이동시키기
	//TODO 확인
	var page = document.getElementById("main"),
	//var page = document.getElementById("hasSectionchangerPage"),
	element = document.getElementById("sectionchanger"),
	sectionChanger, idx=1;

	page.addEventListener("pageshow", function() {
		/* Create the SectionChanger object */
		sectionChanger = new tau.widget.SectionChanger(element, {
			circular: true,
			orientation: "horizontal",
			useBouncingEffect: true
		});
	});

	page.addEventListener("pagehide", function() {
		/* Release the object */
		sectionChanger.destroy();
	});
	
	//TODO 5: 베젤(Bezel)회전 시키기
	//TODO 확인
	//Bezel 회원을 이용하여 SectionChanger를 지원합니다.
	//시계방향(CW)과 반시계방향(CCW)으로 회전
	document.addEventListener("rotarydetent", function(event){
		if(event.detail.direction === "CW"){
			sectionChanger.setActiveSection(sectionChanger.getActiveSectionIndex()+1, 100);
		}else{
			sectionChanger.setActiveSection(sectionChanger.getActiveSectionIndex()-1, 100);
		}
	}, false);
	
} () );
