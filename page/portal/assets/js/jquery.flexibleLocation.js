/*
	
	jQuery flexibleLocation by Somi (Version 1.0.0)
			
	Change Log:
		
		v1.0.0	(2013-07-11) - make
		v1.1.0	(2015-12-11) - modify
	
*/
if(jQuery) (function($) {
	
	$.extend($.fn, {
		
		flexibleLocation: function() {			
			
			var init = function(ul) {

				//변수선언
				ul = $(ul).find('ul');
				
				var nav = $(document).find("." + ul.data("nav"));
				var current = nav.find(".current");
				
				//nav에 current가 없을 때 site-tit의 h2의 값을 경로에 표시
				if(current.eq(0).text() == "") {
					$(document.createElement('li')).appendTo(ul).addClass('dep1');
					$(document.createElement('h2')).appendTo('.dep1').text($(document).find(".site-tit h2").eq(0).text());
					return;
				}
				
				var cln = current.parents("li").last().clone();
				current.parents("li").last().addClass("rootCurrent");
				cln.find('li').removeAttr('style');
				cln.find('> a').attr('href','#none');

				//마크업 생성
				
				$(document.createElement('li')).appendTo(ul).addClass('dep1');
				$(document.createElement('h2')).appendTo('.dep1').text(cln.find('> a').text());
				
				for(var i=0; i< cln.find('li.current').parents('li:not(.rootCurrent)').andSelf().length -1; i++){
					$(document.createElement('li')).appendTo(ul).addClass('dep'+(i+2));
				}
				cln.find('li.current').parents('li:not(.rootCurrent)').addClass('current');

				for(var i=0; i< cln.find('li.current').length;i++){
					$(document.createElement('a')).appendTo($('.dep'+(i+2)))
						.attr('href','#none')
						.html(cln.find('li.current').eq(i).find('>a').html());
					$(document.createElement('ul')).appendTo($('.dep'+(i+2)))
						.html(cln.find('li.current').eq(i).parent().html());
					$('.dep'+(i+2)).find('>ul>li>ul').remove();
				}

				ul.find('>li:last-child').find('>a').css({ 'font-weight':'bold'});
				
				//이벤트 호출
				ul.on('click.flexibleLocation','>li>a',function(){			
					if($(this).next().height() > 0)  closeUL($(this));
					else openUL($(this));					
				});

				ul.on('mouseleave.flexibleLocation','>li',function(){
					if($(this).find('>ul').height() > 0){
						$(this).find('>a').stop().animate({opacity:1},{duration:1500,complete:function(){
							closeUL($(this));
						}});
					}
				})
					.on('mouseenter.flexibleLocation','ul',function(){
						$(this).prev().stop();
				});

				ul.on('click.flexibleLocation','ul > li > a', function(){ 
					$(this).closest('ul').find('li').removeClass('current');
					$(this).parent().addClass('current');
					currentText($(this));
					$(this).parent().parent().parent().next().find(' > a').trigger('click');
				});	

				//함수 실행
				function createChildren(ul,obj){
					if( !obj.parents('li').last().next().get(0) ){
						obj.parents('li').last().parent('ul').append($(document.createElement('li')).html('<a href="#none"></a>'));
					}
					obj.parents('li').last().next().find('>a').html('선택');
					obj.parents('li').last().next().find('>ul').remove();
					var initUl = ul.clone();
					initUl.find('>li>ul').remove();
					obj.parents('li').last().next().append(initUl);
					openUL(obj.parents('li').last().next().find('>a'));
				};

				function currentText(obj){
					obj.parent().parent().parent().find('>a').attr('title',obj.text()).text(obj.text());
					obj.parents('li').last()/*.css('background-position','right -50px')*/.nextAll().remove();
					copied = cln.find('>ul>li');
					depthLi = obj.parents('ul').last();

					var i = obj.parents('ul').last().find('>li:eq(2)').index();
					while( i <= obj.parents('li').last().prevAll('li').length ){
						var index = depthLi.find('>li:eq('+i+')').find('.current').index();
						copied = copied.eq(index);

						if ( copied.find('>ul').length>0 && i === obj.parents('li').last().index() )	{
							createChildren( copied.find('>ul'),obj );
						} 
						copied = copied.find('>ul>li');
						i++;
					}

					ul.find('>li>a').on('click.flexibleLocation',function(){			
						if($(this).next().height() > 0)  closeUL($(this));
						else openUL($(this));					
					});
				}

				function openUL(obj){
					var li = obj.next().find('>li');
					obj.addClass('open');
					obj.next().css({height:0, display:'block', paddingTop:'0', paddingBottom:'0'});
					obj.next().stop().animate({height: li.outerHeight(false)*li.length, paddingTop:'5px', paddingBottom:'5px'},{duration:200});	
					//ul.find('>li').css('background-position','right 0');
					//ul.find('>li:last-child').css('background-position','right -50px');
				}

				function closeUL(obj){
					obj.removeClass();
					obj.next().stop().animate({height:'0', paddingTop:'0', paddingBottom:'0'},{complete: function(){
						obj.next().css({display:'none'});
					}});					
				}				

			}

			$(this).each( function() {
				init(this);
			});
			
			return $(this);
			
		}
		
	});
	
})(jQuery);