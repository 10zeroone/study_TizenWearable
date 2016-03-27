/*global tau */
/*jslint unparam: true */
(function(tau) {
	var page,
		elScroller,
		list,
		listHelper = [],
		snapList = [],
		i, len;

	if (tau.support.shape.circle) {
		document.addEventListener("pagebeforeshow", function (e) {
			page = e.target;
			elScroller = page.querySelector(".ui-scroller");

			if (elScroller) {
				list = elScroller.querySelectorAll(".ui-listview");
				if (list) {
					len = list.length;
					for (i = 0; i < len; i++) {
						listHelper[i] = tau.helper.SnapListStyle.create(list[i]);
					}
					len = listHelper.length;
					if (len) {
						for (i = 0; i < len; i++) {
							snapList[i] = listHelper[i].getSnapList();
						}
					}
				}
				elScroller.setAttribute("tizen-circular-scrollbar", "");
			}
		});

		document.addEventListener("pagebeforehide", function (e) {
			len = listHelper.length;
			if (len) {
				for (i = 0; i < len; i++) {
					listHelper[i].destroy();
				}
				listHelper = [];
			}
			if(elScroller) {
				elScroller.removeAttribute("tizen-circular-scrollbar");
			}
		});
	}
}(tau));

//TODO 2: 페이지 이동 코드
//TODO 확인
function changePage(e){
	//tau.changePage(): 다른 페이지로 이동
//	tau.changePage("#sub")
	
	//TODO 3: 화면 전환시 아래에서 위로 올라가는 이동효과
	//TODO 확인
	//transition 속성: 이동 애니메이션 효과 속성
	//none: 기본값으로 전환 효과 없음
	//slideup: 화면 전환시 아래에서 위로 올라가는 이동효과
	tau.changePage("#sub", {transition: "slideup"})
}
