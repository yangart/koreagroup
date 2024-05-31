document.addEventListener('DOMContentLoaded', function() {
	var choicesList = document.querySelectorAll('[data-choices]');
	for (i = 0; i < choicesList.length; ++i) {
		var element = choicesList[i];
		new Choices(element, {
			allowHTML: true,
			searchEnabled: false,
		});
	}
	// Scroll Back Top Button
	var toTop = document.getElementById("backToTop");
	toTop.addEventListener("click", backToTop);
	function backToTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
});

jQuery(function($){

	$(".form-datepicker").on('click', function(){
		$(".datepicker-box").fadeOut(150);
        if($(this).parents('.datepicker-wrap').hasClass('show')){
			return false;
		}else{
			$(this).parents('.datepicker-wrap').addClass('show');
			$(this).siblings('.datepicker-box').fadeIn(150);
			return false;
		}
	});
	$(".datepicker-wrap").on('click', function(){
        if($(this).hasClass('show')){
			$(this).removeClass('show');
			$(this).find('.datepicker-box').fadeOut(150);
		}else{
			return false;
		}
	});

	$(".modal-side-toggle").on('click', function(){
        if($(this).parents('.modal-body').hasClass('expanded')){
			$(this).parents('.modal-body').removeClass('expanded');
			return false;
		}else{
			$(this).parents('.modal-body').addClass('expanded');
			return false;
		}
	});

	$(".mbody-memo-toggle .toggle-btn").on('click', function(){
        if($(this).parents('.mbody-memo-toggle').hasClass('expanded')){
			$(this).parents('.mbody-memo-toggle').removeClass('expanded');
			return false;
		}else{
			$(this).parents('.mbody-memo-toggle').addClass('expanded');
			return false;
		}
	});

	$(".mbody-tuition-toggle .title").on('click', function(){
        if($(this).parents('.list-item').hasClass('expanded')){
			$(this).parents('.list-item').removeClass('expanded');
			return false;
		}else{
			$(this).parents('.list-item').addClass('expanded');
			return false;
		}
	});



	$(".radio-tabs-check").on("change",function(){
		if($(this).hasClass('switch1')){
			$(this).parents('.mbody-clause-agree').addClass('switch1');
			$(this).parents('.mbody-clause-agree').removeClass('switch2');
		}else if($(this).hasClass('switch2')){
			$(this).parents('.mbody-clause-agree').addClass('switch2');
			$(this).parents('.mbody-clause-agree').removeClass('switch1');
		}

		/*
		var child = $(this).parents(".checkboxs").find(".check_item input[type=checkbox]");
		if ($(this).prop("checked")){
			child.prop("checked",true);
		}else{
			child.prop("checked",false);
		}*/
	})

/*
	$('.chk-select').find('select').change(function() {
		  var current = $('.select-input').val();
		  if (current != 'null') {
			  $(this).css({'color':'#2c2c2c'})
			  $(this).parent().addClass('active');
		  } else {
			   $(this).css({'color':'#b1b1b1'})	
			   $(this).parent().removeClass('active');
		  }
	}); 

	$(".checkboxs .all_check input[type=checkbox]").on("change",function(){
		var child = $(this).parents(".checkboxs").find(".check_item input[type=checkbox]");
		if ($(this).prop("checked")){
			child.prop("checked",true);
		}else{
			child.prop("checked",false);
		}
	})
	$(".checkboxs .check_item input[type=checkbox]").on("change",function(){
		var parent = $(this).parents(".checkboxs").find(".all_check input[type=checkbox]");
		var child = $(this).parents(".checkboxs").find(".check_item input[type=checkbox]");
		var flag = true;
		child.each(function(i,v){
			if (!$(v).prop("checked")){
				flag=false;
				return false;
			}
		})
		parent.prop("checked",flag)
	})

   	
    	// 단체시 연령부분
	    $("#age1").on("change", function() {
            if($(this).val() == "01") {
                $("#age2").show();
                $("#age3").hide();
                $("#age4").hide();
                $("#age5").hide();
                $("#age3").val("");
                $("#age4").val("");
                $("#age5").val("");
            } else if ($(this).val() == "02") {
            	$("#age2").hide();
            	$("#age3").show();
            	$("#age4").hide();
            	$("#age5").hide();
            	$("#age2").val("");
            	$("#age3").val("");
                $("#age4").val("");
                $("#age5").val("");
            } else if ($(this).val() == "03") {
                $("#age2").hide();
                $("#age3").show();
                $("#age4").hide();
                $("#age5").hide();
                $("#age2").val("");
                $("#age3").val("");
                $("#age4").val("");
                $("#age5").val("");
            } else if ($(this).val() == "04"){
            	$("#age2").hide();
                $("#age3").hide();
                $("#age4").show();
                $("#age5").hide();
                $("#age2").val("");
                $("#age3").val("");
                $("#age5").val("");
            } else if ($(this).val() == "05") {
            	$("#age2").hide();
                $("#age3").hide();
                $("#age4").hide();
                $("#age5").show();
                $("#age2").val("");
                $("#age3").val("");
                $("#age4").val("");
            } else {
            	$("#age2").hide();
                $("#age3").hide();
                $("#age4").hide();
                $("#age5").hide();
                $("#age2").val("");
                $("#age3").val("");
                $("#age4").val("");
                $("#age5").val("");
            }
        });
*/

});
