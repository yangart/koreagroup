// document.addEventListener('DOMContentLoaded', function() {
// 	var choicesList = document.querySelectorAll('[data-choices]');
// 	for (i = 0; i < choicesList.length; ++i) {
// 		var element = choicesList[i];
// 		new Choices(element, {
// 			allowHTML: true,
// 			searchEnabled: false,
// 		});
// 	}
// });
var toTop = document.getElementById("backToTop");
toTop.addEventListener("click", backToTop);
function backToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}
