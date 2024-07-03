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
	// const tables = document.querySelectorAll('.table-sticky');
	// tables.forEach(table => {
	// 	const isTableSticky = table.classList.contains('table-sticky');

	// 	if (isTableSticky) {
	// 		const rows = table.querySelectorAll('tr');

	// 		rows.forEach(row => {
	// 			const stickyCols = row.querySelectorAll('.sticky-col');
	// 			let leftOffset = 0; // left 속성 값 초기화

	// 			stickyCols.forEach(col => {
	// 				// 각 셀의 너비를 측정
	// 				const colWidth = col.offsetWidth;

	// 				col.style.position = 'sticky';
	// 				col.style.left = `${leftOffset}px`;
	// 				col.style.width = `${colWidth}px`;
	// 				col.style.zIndex = 3;
	// 				leftOffset += colWidth;
	// 			});
	// 		});
	// 	}
	// });
	// const tables = document.querySelectorAll('.table-sticky');

	// tables.forEach(table => {
	// 	const theadRows = table.querySelectorAll('thead tr');
	// 	const tbodyRows = table.querySelectorAll('tbody tr');
	// 	const tfootRows = table.querySelectorAll('tfoot tr');

	// 	// thead, tbody, tfoot 각 섹션의 셀들에 대한 배열 생성
	// 	const sections = [
	// 		{ rows: Array.from(theadRows), stickyClass: 'thead-sticky-col' },
	// 		{ rows: Array.from(tbodyRows), stickyClass: 'tbody-sticky-col' },
	// 		{ rows: Array.from(tfootRows), stickyClass: 'tfoot-sticky-col' }
	// 	];

	// 	// 각 섹션별로 열의 left offset을 저장하는 배열
	// 	const leftOffsets = sections.map(() => []);

	// 	// 각 섹션별로 셀들에 sticky 속성 적용
	// 	sections.forEach((section, sectionIndex) => {
	// 		section.rows.forEach((row, rowIndex) => {
	// 			const stickyCols = row.querySelectorAll('.sticky-col');
	// 			let currentLeftOffset = 0;

	// 			stickyCols.forEach((col, colIndex) => {
	// 				const colWidth = col.offsetWidth;
	// 				const rowspan = col.getAttribute('rowspan') ? parseInt(col.getAttribute('rowspan'), 10) : 1;

	// 				// 현재 셀의 left offset 설정
	// 				if (leftOffsets[sectionIndex][colIndex] !== undefined) {
	// 					currentLeftOffset = leftOffsets[sectionIndex][colIndex];
	// 				}

	// 				// 셀에 sticky 속성 적용
	// 				col.style.position = 'sticky';
	// 				col.style.left = `${currentLeftOffset}px`;
	// 				col.style.width = `${colWidth}px`;
	// 				col.style.zIndex = 3;
	// 				col.classList.add(section.stickyClass);

	// 				// rowspan 처리
	// 				if (rowspan > 1) {
	// 					for (let i = 1; i < rowspan; i++) {
	// 						const nextRowIndex = rowIndex + i;
	// 						if (nextRowIndex < section.rows.length) {
	// 							if (leftOffsets[sectionIndex][colIndex] === undefined) {
	// 								leftOffsets[sectionIndex][colIndex] = 0;
	// 							}
	// 							leftOffsets[sectionIndex][colIndex] += colWidth;
	// 						}
	// 					}
	// 				}

	// 				currentLeftOffset += colWidth;
	// 			});
	// 		});
	// 	});
	// });

	// const tables = document.querySelectorAll('.table-sticky');

	// tables.forEach(table => {
	// 	const sections = [
	// 		{ sectionName: 'thead', rows: table.querySelectorAll('thead tr') },
	// 		{ sectionName: 'tbody', rows: table.querySelectorAll('tbody tr') },
	// 		{ sectionName: 'tfoot', rows: table.querySelectorAll('tfoot tr') }
	// 	];

	// 	sections.forEach(section => {
	// 		const rows = Array.from(section.rows);
	// 		const columnOffsets = []; // 각 열의 각 행에 대한 left offset을 저장하는 배열

	// 		rows.forEach((row, rowIndex) => {
	// 			let currentLeftOffset = 0;
	// 			let columnSpanOffset = []; // rowspan 처리를 위한 임시 배열

	// 			Array.from(row.cells).forEach((cell, colIndex) => {
	// 				const colWidth = cell.offsetWidth;
	// 				const rowspan = cell.rowSpan || 1;
	// 				const colspan = cell.colSpan || 1;

	// 				// sticky-col 클래스가 있는 경우에만 sticky 속성을 적용
	// 				if (cell.classList.contains('sticky-col')) {
	// 					// 현재 열에 대한 left offset 설정
	// 					if (!columnOffsets[colIndex]) {
	// 						columnOffsets[colIndex] = [];
	// 					}

	// 					// rowspan 처리를 위한 임시 배열 초기화
	// 					if (!columnSpanOffset[colIndex]) {
	// 						columnSpanOffset[colIndex] = 0;
	// 					}

	// 					// rowspan 처리된 열의 경우, 이전 행의 값을 가져와서 left offset 설정
	// 					if (columnSpanOffset[colIndex] > 0) {
	// 						currentLeftOffset = columnOffsets[colIndex][rowIndex - 1];
	// 					}

	// 					// 현재 셀에 sticky 속성 적용
	// 					cell.style.position = 'sticky';
	// 					cell.style.left = `${currentLeftOffset}px`;
	// 					cell.style.width = `${colWidth}px`;
	// 					cell.style.zIndex = 3;

	// 					// 현재 행에 대한 left offset 누적
	// 					columnOffsets[colIndex][rowIndex] = currentLeftOffset;

	// 					// rowspan 처리된 경우, 다음 행들에 대해서도 left offset 누적
	// 					if (rowspan > 1) {
	// 						for (let i = 1; i < rowspan; i++) {
	// 							if (!columnOffsets[colIndex][rowIndex + i]) {
	// 								columnOffsets[colIndex][rowIndex + i] = 0;
	// 							}
	// 							columnOffsets[colIndex][rowIndex + i] += colWidth;
	// 						}
	// 					}

	// 					// colspan 처리된 경우, 다음 열에 대한 offset 업데이트
	// 					if (colspan > 1) {
	// 						for (let i = 1; i < colspan; i++) {
	// 							if (!columnSpanOffset[colIndex + i]) {
	// 								columnSpanOffset[colIndex + i] = 0;
	// 							}
	// 							columnSpanOffset[colIndex + i] += colWidth;
	// 						}
	// 					}
	// 				}

	// 				// 현재 열의 left offset 업데이트
	// 				currentLeftOffset += colWidth;
	// 			});
	// 		});
	// 	});
	// });

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