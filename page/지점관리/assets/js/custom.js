document.addEventListener('DOMContentLoaded', function () {
	var choicesList = document.querySelectorAll('[data-choices]');
	for (i = 0; i < choicesList.length; ++i) {
		var element = choicesList[i];
		new Choices(element, {
			allowHTML: true,
			searchEnabled: false,
		});
	}

	// table sticky
	const tables = document.querySelectorAll('.table-sticky');
	tables.forEach(table => {
		const isTableSticky = table.classList.contains('table-sticky');

		if (isTableSticky) {
			const rows = table.querySelectorAll('tr');

			rows.forEach(row => {
				const stickyCols = row.querySelectorAll('.sticky-col');
				let leftOffset = 0; // left 속성 값 초기화

				stickyCols.forEach(col => {
					// 각 셀의 너비를 측정
					const colWidth = col.offsetWidth;

					col.style.position = 'sticky';
					col.style.left = `${leftOffset}px`;
					col.style.width = `${colWidth}px`;
					col.style.zIndex = 3;
					leftOffset += colWidth;
				});
			});
		}
	});
});
jQuery(function ($) {

	/* 모달 2개 이상일 때 */
	$(document).on('hidden.bs.modal', '.modal', function () {
		$('.modal:visible').length && $(document.body).addClass('modal-open');
	});
	/*
		$(".form-datepicker").click(function() {
			$(".datepicker-box").fadeOut(150);
			if($(this).parents('.datepicker-wrap').hasClass('show')){
				return false;
			}else{
				$(this).parents('.datepicker-wrap').addClass('show');
				$(this).siblings('.datepicker-box').fadeIn(150);
				return false;
			}
		});
		$(".datepicker-wrap").click(function() {
			if($(this).hasClass('show')){
				$(this).removeClass('show');
				$(this).find('.datepicker-box').fadeOut(150);
			}else{
				return false;
			}
		});
	
		$(".mnb > li").each(function(){
			$(this).has('.depth2').addClass('parent');
		});
	
		modalScroll();
		$(window).resize(modalScroll);
		function modalScroll(){
			var $window_height = $(window).outerHeight();
			var $modal_padding = 56;
			var $modal_area = 0;
			var $modal_head = 0;
			var $modal_body = 0;
			var $modal_cont = 0;
	
			$(".modal_area").each(function(){
				$modal_area = $(this).outerHeight();
				$modal_area = $window_height - 40;
				$modal_body = $(this).find('.modal_body').outerHeight();
				$modal_cont = $(this).find('.modal_content').outerHeight();
				if($(this).find('.modal_head').length > 0){
					$modal_head = $(this).find('.modal_head').outerHeight();
				}			
				if($modal_cont >= $modal_area - $modal_head){
					$(this).find('.modal_body').addClass('on').height($modal_area - $modal_head);
					$(this).find('.modal_body').addClass('on');
				}else{
					$(this).find('.modal_body').removeClass('on').height('');
				}
			});
		}
	
		scrollHref();
		$(window).resize(scrollHref);
		function scrollHref(){
			var pdTop = 20;
			$("#header #test a, .academy_view_tabs > li >a").on('click', function(event) {
				$('html,body').stop().animate({scrollTop:Math.round($(this.hash).offset().top) - pdTop}, 600, 'easeOutQuart');
				event.preventDefault();
			});
		}
	*/
});