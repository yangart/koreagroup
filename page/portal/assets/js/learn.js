/*		
	date : 2015-05-20
	author :  Somi Park	
	site : Simmtech
*/

var ie = /MSIE/.test(navigator.userAgent);
ieVer = ie ? parseInt(navigator.userAgent.split('MSIE')[1].split(';')[0]) : false;


if(jQuery) (function($) {
	
	//Width Control
	$.extend($.fn, {
		
		fncWidth: function() {		
			
			var init = function(menu) {
				
				menu = $(menu).find('>ul');
				menu.find('>li').css({ width : 100/menu.find('>li').length + '%' });
			}

			$(this).each( function() {
				init(this);
			});
			
			return $(this);			
		}		
	});

	// Gnb
	$.extend($.fn, {
		
		openMenu: function() {		
			
			var init = function(link) {
				
				link = $(link);	
				var snb	= link.next().addClass('snb');
				var snbH,pdT,pdB,scroll;
				
				//초기화 : 높이 체크
				//snb.css({display:'block',opacity:'0'});
				//snbH = snb.height();				
				//pdT = snb.css('padding-top');
				//pdB = snb.css('padding-bottom');
				snbH = 330;
				pdT = 5;
				pdB = 25;

				link.on('click.openMenu',function(){	
					if(link.parent().children().length == 1) {
						$(".learning-nav li.current").removeClass("current");
						link.parent().addClass("current");
						return;
					}
					
					if(link.hasClass('on')) { closeSNB(); }
					else { 
						link.parents('nav').first().find('.on').trigger('click');
						openSNB(); 
					}
				});

				snb.parent().first().on('mouseleave.openMenu',function(){
					if(snbH == snb.height()){
						snb.stop().animate({opacity:1},{duration:1000,complete:function(){
							closeSNB();
						}});
					}
				})
				 .on('mouseenter.openMenu',function(){
					if(snbH == snb.height()){ snb.stop(); }
				});
				
				snb.find("a:only-child").on("click",function(){
					$(".learning-nav li.current").removeClass("on");
					$(this).parents("li").last().addClass("current");
					closeSNB();
				});

				//snb.find(">li>a").on("click.flexList",function(){
				snb.find("ul").first().find(">li>a").on("click.flexList",function(){

					var snbH = $(this).parents("ul").first().find(">li").height();
						snbLeng = $(this).parents("ul").first().find(">li").length;

					// add & remove "active" class
					if( $(this).parent().children().length > 1){
						if ($(this).parent().hasClass("active")){
							$(this).parent().removeClass("active");
						}else {
							$(this).parents("ul").first().find("li").removeClass("active");
							$(this).parent().addClass("active");
						}
					}else{
						$(this).parents("ul").first().find("li").removeClass("active");
					}

					//adjust snb height
					
					var liLeng = $(this).parent().find("li").length,
						liH = $(this).parent().find("li").eq(0).height();

					snb.css({height:(snbH*snbLeng) + (liLeng*liH)});
				});
				
				//snb.find('li').last().find('a').on('focusout.openMenu',function(){
				//	closeSNB();
				//});

				function openSNB(event){
					link.addClass('on');
					snb.css({display:'block'}).stop().animate({height:snbH,paddingTop:pdT,paddingBottom:pdB,opacity:1},200);
				}

				function closeSNB(event){
					link.removeClass('on');
					$(".snb").find("li").removeClass("active");
					snb.stop().animate({height:0,paddingTop:0,paddingBottom:0,opacity:0},200,function(){
						snb.css({display:'none'});
					});
				}

			}

			$(this).each( function() {
				init(this);
			});

			$('.lnb, .exampaper').each(function(){
				if($(this).height() > $(this).parents('.wrap').first().height()) {
					$(this).parents('.wrap').first().css({minHeight:$(this).height()});
				}
			});
			
			return $(this);			
		}		
	});

	//Width Control
	$.extend($.fn, {
		
		progressColor: function() {		
			
			var init = function(el) {
				el = $(el);
				
				if(el.text() == "100%") {
					el.removeClass("studying");
					el.addClass("complete");
				} else if (el.text() != "0%"){
					el.removeClass("complete");
					el.addClass("studying");
				}
			}

			$(this).each( function() {
				init(this);
			});

			return $(this);			
		}		
	});
	
	//학습창 높이값에 따른 nav 조절
	$.extend($.fn, {
		
		navAreaControll: function() {		
			
			var init = function(nav) {
				nav = $(nav);
				
				var ua = window.navigator.userAgent;
			    var msie = ua.indexOf("MSIE ");

				//if (msie > 0 && parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) < 9) {

					var winH = 730; //기준 높이값				
					if( $(window).height() < winH ){
						nav.addClass("min");
					}else{
						nav.removeClass("min");
					}
				//}
			}

			$(this).each( function() {
				init(this);
			});

			return $(this);			
		}		
	});

})(jQuery);

$(document).ready(function(){
	//$(".study-header nav").fncWidth();
	$(".learning-nav > ul > li > a").openMenu();
	$(".progress").progressColor();
	$(".mCustomScrollbar").mCustomScrollbar({
					callbacks:{
						whileScrolling:function(){ 
							if(this.mcs.topPct > 90) {
								$(".mCustomScrollbar").addClass("end");
							} else {
								$(".mCustomScrollbar").removeClass("end");
							}
						}
					}
				});

	$('select:not(select[multiple]):not(.normal)').selectmenu();
	
	$(".learning-nav-open").on("click",function(){
		$(this).parent().toggleClass("open");
	});
	
	//$(".learning-popup").navAreaControll();
	try { 
		$("input").checkingInput();
	}
	catch (ex) {}	
});


$(window).scroll(function() {
});

$(window).resize(function(){
	$(".learning-popup").navAreaControll();
});
